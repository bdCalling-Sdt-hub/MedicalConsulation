export function extractDateTimeParts(dateTimeStr) {
  const dateObj = new Date(dateTimeStr);

  // Extract the day (e.g., "Sunday", "Monday", etc.)
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = daysOfWeek[dateObj.getUTCDay()];

  // Extract the time in HH:MM format
  let hours = dateObj.getUTCHours();
  const minutes = dateObj.getUTCMinutes().toString().padStart(2, "0");

  // Determine AM or PM
  const period = hours >= 12 ? "PM" : "AM";

  //date  04 or month name like (jan) extract on date
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  // Extract the date (e.g., "01", "02", etc.)
  const date = `${dateObj.getUTCDate()} ${monthNames[dateObj.getUTCMonth()]}`;

  // Convert to 12-hour format
  hours = hours % 12 || 12;

  const time = `${hours}:${minutes} ${period}`;

  // Determine morning, evening, or night
  let timeOfDay = "";
  if (hours >= 5 && hours < 12 && period === "AM") {
    timeOfDay = "Morning";
  } else if (hours >= 12 && period === "PM" && hours < 6) {
    timeOfDay = "Afternoon";
  } else if (hours >= 6 && period === "PM") {
    timeOfDay = "Evening";
  } else {
    timeOfDay = "Night";
  }

  return {
    day,
    time,
    period,
    timeOfDay,
    date,
  };
}

// Example usage:
const dateTimeStr = "2024-10-20T05:31:49.350+00:00";
const dateTimeParts = extractDateTimeParts(dateTimeStr);

console.log("Day:", dateTimeParts.day);
console.log("Time:", dateTimeParts.time);
console.log("Period (AM/PM):", dateTimeParts.period);
console.log("Time of Day:", dateTimeParts.timeOfDay);
