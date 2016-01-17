require 'thin/async'

module Responders::NobrainerSseResponder
  class DbHandler < RethinkDB::Handler
    delegate :write, to: '@writer'

    def initialize(writer)
      @writer = writer
    end

    # find all callbacks at https://rethinkdb.com/api/ruby/em_run/

    def on_error(err)
      Rails.logger.error "SseResponder: #{err.to_s}"
    end

    def on_initial_val(val)
      write(old_val: nil, new_val: val)
    end

    def on_change(old, new)
      write(old_val: old, new_val: new)
    end
  end

  PING_INTERVAL = 25 # so that Heroku don't close the socket

  def to_sse
    response = Thin::AsyncResponse.new(request.env, 200, 'Content-Type' => 'text/event-stream')
    response.send_headers

    output_stream = ActionController::Live::SSE.new(response, retry: 300, event: 'row')
    db_handler = DbHandler.new(output_stream)

    rethink_handle = rethink_query.em_run(NoBrainer.connection.raw, db_handler)

    pinger = EventMachine::PeriodicTimer.new(PING_INTERVAL) do
      output_stream.write('PING', event: 'ping')
    end

    response.callback do # aka client disconnected
      pinger.cancel
      rethink_handle.close
    end

    # sending immediate response with just headers
    head -1
  end

  private

  def rethink_query
    resource.to_rql.changes(include_initial: true)
  end

end