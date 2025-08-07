export function formatDate(isoDateString) {
  const date = new Date(isoDateString);

  // Define month names for formatting
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

  // Extract day, month, and year
  const day = date.getUTCDate(); // Use UTC methods to avoid timezone issues
  const month = monthNames[date.getUTCMonth()]; // Get month name from array
  const year = date.getUTCFullYear();

  // Format as "12 Aug 2025"
  return `${day} ${month} ${year}`;
}

// Example usage
// const isoDate = "2025-01-30T17:20:07.235Z";
// const formattedDate = formatDate(isoDate);
// console.log(formattedDate); // Output: "30 Jan 2025"

// output Wednesday, August 6, 2025

export const formatDateWithFull = (date) => {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
