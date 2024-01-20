export const getChapters = (uuid, data) => {
  function timeToSeconds(time) {
    const parts = time.split(":");
    if (parts.length !== 3) {
      throw new Error("Incorrect time format. It should be HH:MM:SS");
    }

    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parseInt(parts[2], 10);

    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
      throw new Error("Incorrect time format. It should be HH:MM:SS");
    }

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    return totalSeconds;
  }

  // Extract timestamps (either 00:00:00, 0:00:00, 00:00 or 0:00)
  if (data) {

    const description = data.items[0].snippet.description;
    //console.log ( "description", description)

    const lines = description.split("\n");
    const regex = /(\d{0,2}:?\d{1,2}:\d{2})/g;
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