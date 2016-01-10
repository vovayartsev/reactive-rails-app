class CoffeeCupsController < ApplicationController
  responders :nobrainer_sse
  respond_to :html, :sse, only: [:index]
  respond_to :json, only: [:create]

  def index
    respond_with cups, include_original: true
  end

  def create
    cup = CoffeeCup.create! coffee_cup_params.merge(user_id: current_user_id)
    MakeCoffeeJob.new(cup.id).enqueue
    render json: {message: I18n.t('messages.coffee_cups.scheduled')}, status: 201
  end

  private

  def cups
    CoffeeCup.where(user_id: current_user_id)
  end

  def coffee_cup_params
    params.require(:coffee_cup).permit(:kind)
  end
end