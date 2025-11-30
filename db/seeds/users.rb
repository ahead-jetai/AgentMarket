# Create a default team and user
puts "Seeding Users and Teams..."

team = Team.find_or_create_by!(name: "Founders Inc.")

User.find_or_create_by!(email: "user@example.com") do |u|
  u.team = team
end

puts "Users seeded."
