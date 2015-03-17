Item.delete_all
('a'..'f').each do |name|
  Item.create!(name: name)
end
