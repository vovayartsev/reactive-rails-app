require 'thin/async'

module Responders::NobrainerSseResponder
  class AsyncResponse < Thin::AsyncResponse
    alias_method :close, :done

    def initialize(request)
      super(request.env, 200, 'Content-Type' => 'text/event-stream')
    end

    def sse
      @sse ||= ActionController::Live::SSE.new(self, retry: 300, event: "event-name")
    end
  end

  def to_sse
    async_response = AsyncResponse.new(request)

    rethink_handle = resource.to_rql.changes.em_run(NoBrainer.connection.raw) do |row|
      async_response.sse.write(row)
    end

    async_response.callback do  # aka on_close
      rethink_handle.close
    end

    # sending immediate response with just headers
    head -1
  end
end