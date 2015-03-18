Item.delete_all
Item.create!(name: '@', done: true)
('a'..'f').each do |name|
  Item.create!(name: name)
end
