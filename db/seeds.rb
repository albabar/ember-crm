# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Lead.destroy_all

random_status = ['new', 'in progress', 'closed', 'bad'].sample

20.times do
  Lead.create!(
      first_name: FFaker::Name.first_name,
      last_name: FFaker::Name.last_name,
      email: FFaker::Internet.email,
      phone: FFaker::PhoneNumber.phone_number,
      status: random_status,
      notes: FFaker::HipsterIpsum.words(10).join(' ')
  )
end