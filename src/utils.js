export const getChapters = (uuid, data) => {
  if (!data) {
    throw new Error("Data must not be null or undefined");
  }

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

  const { description } = data.items[0].snippet;
  const lines = description.split("\n");
  const regex = /(\d{0,2}:?\d{1,2}:\d{2}|\d{1,2}:?\d{2})/g;
  const chapters = [];

  for (const line of lines) {
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
};

export const getYoutubeVideoId = (url) => {
  const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

export const addTimeEndProperty = (arrayOfObjects) => {
  if (arrayOfObjects.length < 2) {
    console.error("Array must have at least two elements");
    return arrayOfObjects;
  }

  return arrayOfObjects.map((item, index) => {
    if (index < arrayOfObjects.length - 1) {
      return { ...item, timeEnd: arrayOfObjects[index + 1].timeSeconds };
    }
    return item;
  });
};

export const storeData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};