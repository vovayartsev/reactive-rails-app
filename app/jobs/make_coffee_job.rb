class MakeCoffeeJob < ActiveJob::Base
  def perform(coffee_cup_id)
    coffee_cup = CoffeeCup.find(coffee_cup_id)

    coffee_cup.update(status: 'boiling_water', percent: 10)
    sleep(1)

    coffee_cup.update(status: 'grinding_beans', percent: 30)
    sleep(1)

    coffee_cup.update(status: 'combining_together', percent: 60)
    sleep(1)

    if coffee_cup.kind == 'cappuccino'
      coffee_cup.update(status: 'adding_milk', percent: 80)
      sleep(1)
    end

    coffee_cup.update(status: 'ready', percent: 100)
  end
end