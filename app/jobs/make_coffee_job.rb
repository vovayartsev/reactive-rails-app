class MakeCoffeeJob < ActiveJob::Base
  def perform(coffee_cup_id)
    coffee_cup = CoffeeCup.find(coffee_cup_id)
    Rails.logger.info "[#{coffee_cup_id}] Making a cup of #{coffee_cup.kind}..."
    sleep(5)
    Rails.logger.info "[#{coffee_cup_id}] Done"
    coffee_cup.update(status: 'ready')
  end
end