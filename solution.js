function solution(s) {
  // Split the input string into an array of lines
  const lines = s.split("\n");
  
  // Create an object to store the city groups
  const cityGroups = {};
  
  // Iterate over each line in the input
  for (let i = 0 ; i < lines.length ; i ++) {
    const line = lines[i];

    // Split the line into photo name, city name, and date/time
    const [photoName, cityName, dateTime] = line.split(", ");
    
    // Extract the extension from the photo name
    const extension = photoName.split(".")[1];
    
    // Get the city group for the current city
    const cityGroup = cityGroups[cityName] || [];
    
    // Push the photo name and date/time to the city group
    cityGroup.push({ photoName, dateTime, extension, index: i });
    
    // Sort the city group by the date/time
    cityGroup.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
    
    // Update the city group in the cityGroups object
    cityGroups[cityName] = cityGroup;
  }
  
  // Create an array to store the new names of the photos
  const newNames = [];
  
  // Iterate over each city group
  for (const cityName in cityGroups) {
    const cityGroup = cityGroups[cityName];
    
    // Get the number format length
    const numLen = String(cityGroup.length).length;
    
    // Iterate over each photo in the city group
    for (let i = 0; i < cityGroup.length; i++) {
      const { extension, index } = cityGroup[i];
      
      // Get the photo number with leading zeros
      const photoNum = String(i + 1).padStart(numLen, "0");
      
      // Create the new name for the photo
      const newName = {name: `${cityName}${photoNum}.${extension}`, index};
      
      // Add the new name to the array
      newNames.push(newName);
    }
  }

  // Sort the new names by index
  newNames.sort((a, b) => a.index - b.index);
  
  // Return the new names joined by newline characters
  return newNames.map(newName => newName.name).join("\n");
}

const input = `photo.jpg, Krakow, 2013-09-05 14:08:15
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
g.jpg, Krakow, 2016-02-29 22:13:11`;

console.log(solution(input));