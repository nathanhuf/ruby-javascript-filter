require 'date'

def solution(s)
  # Split the input string into an array of lines
  lines = s.split("\n")
  
  # Create a hash to store the city groups
  city_groups = {}
  
  # Iterate over each line in the input
  lines.each_with_index do |line, i|
    # Split the line into photo name, city name, and date/time
    photo_name, city_name, date_time = line.split(", ")
    
    # Extract the extension from the photo name
    extension = photo_name.split(".")[1]
    
    # Get the city group for the current city
    city_group = city_groups[city_name] || []
    
    # Push the photo name and date/time to the city group
    city_group << { photo_name: photo_name, date_time: date_time, extension: extension, index: i }
    
    # Sort the city group by the date/time
    city_group.sort_by! { |item| DateTime.parse(item[:date_time]) }
    
    # Update the city group in the city_groups hash
    city_groups[city_name] = city_group
  end
  
  # Create an array to store the new names of the photos
  new_names = []
  
  # Iterate over each city group
  city_groups.each do |city_name, city_group|
    # Get the number format length
    num_len = city_group.length.to_s.length
    
    # Iterate over each photo in the city group
    city_group.each_with_index do |photo, i|
      extension = photo[:extension]
      index = photo[:index]
      
      # Get the photo number with leading zeros
      photo_num = (i + 1).to_s.rjust(num_len, "0")
      
      # Create the new name for the photo
      new_name = { name: "#{city_name}#{photo_num}.#{extension}", index: index }
      
      # Add the new name to the array
      new_names << new_name
    end
  end

  # Sort the new names by index
  new_names.sort_by! { |item| item[:index] }
  
  # Return the new names joined by newline characters
  new_names.map { |new_name| new_name[:name] }.join("\n")
end

input = "photo.jpg, Krakow, 2013-09-05 14:08:15
Mike.png, London, 2015-06-20 15:13:22
myFriends.png, Krakow, 2013-09-05 14:07:13
Eiffel.jpg, Florianopolis, 2015-07-23 08:03:02
pisatower.jpg, Florianopolis, 2015-07-22 23:59:59
BOB.jpg, London, 2015-08-05 00:02:03
notredame.png, Florianopolis, 2015-09-01 12:00:00
me.jpg, Krakow, 2013-09-06 15:40:22
a.png, Krakow, 2016-02-13 13:33:50
b.jpg, Krakow, 2016-01-02 15:12:22
c.jpg, Krakow, 2016-01-02 14:34:30
d.jpg, Krakow, 2016-01-02 15:15:01
e.png, Krakow, 2016-01-02 09:49:09
f.png, Krakow, 2016-01-02 10:55:32
g.jpg, Krakow, 2016-02-29 22:13:11"

puts solution(input)