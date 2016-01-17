class MakeCoffeeJob < ActiveJob::Base
  def perform(coffee_cup_id)
    coffee_cup = CoffeeCup.find(coffee_cup_id)

    coffee_cup.update(status: 'boiling_water')
    sleep(1)

    coffee_cup.update(status: 'grinding_beans')
    sleep(1)

    coffee_cup.update(status: 'combining_together')
    sleep(1)

    if coffee_cup.kind == 'cappuccino'
      coffee_cup.update(status: 'adding_milk')
      sleep(1)
    end

    coffee_cup.update(status: 'ready')
  end
end