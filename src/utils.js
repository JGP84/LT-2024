export const getChapters = (uuid, data) => {
  function timeToSeconds(time) {
    const parts = time.split(":").map((part) => parseInt(part, 10));

    if (parts.some((part) => isNaN(part))) {
      throw new Error("Incorrect time format. It should be HH:MM:SS");
    }

    const totalSeconds =
      parts.length === 3
        ? parts[0] * 3600 + parts[1] * 60 + parts[2]
        : parts[0] * 60 + parts[1];

    return totalSeconds;
  }

  // Extract timestamps (either 00:00:00, 0:00:00, 00:00 or 0:00)
  if (data) {
    const description = data.items[0].snippet.description;
    const lines = description.split("\n");
    const regex = /(\d{0,2}:?\d{1,2}:\d{2}|\d{1,2}:?\d{2})/g;
    const chapters = [];

    for (const line of lines) {
      // Match the regex and check if the line contains a matched regex
      const matches = line.match(regex);
      if (matches) {
        const ts = matches[0];
        const title = line
          .split(" ")
          .filter((l) => !l.includes(ts))
          .join(" ");

        chapters.push({
          timeSeconds: timeToSeconds(ts),
          timestamp: ts,
          title: title,
          id: uuid(),
          checked: false,
          selected: false,
        });
      }
    }

    return chapters;
  }
};


export const getYoutubeVideoId = ( url )=>{
  // Expresión regular para extraer el ID del video de una URL de YouTube
  const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  
  // Intenta hacer coincidir la expresión regular con la URL
  const match = url.match(regex);

  // Si hay una coincidencia, devuelve el ID del video, de lo contrario, devuelve null
  return match ? match[1] : null;
}

export const addTimeEndProperty = (arrayOfObjects) => {
  // Check if the array has at least two elements
  if (arrayOfObjects.length < 2) {
    console.error("Array must have at least two elements");
    return arrayOfObjects;
  }

  // Iterate over the array and add the "timeEnd" property
  for (let i = 0; i < arrayOfObjects.length - 1; i++) {
    // Assign the value of "timeSeconds" from the next object as "timeEnd"
    arrayOfObjects[i].timeEnd = arrayOfObjects[i + 1].timeSeconds;
  }

  return arrayOfObjects;
};

export const storeData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};