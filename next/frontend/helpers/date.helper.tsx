export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const formatDate = (date: Date): string => {
  if (date !== undefined && date !== null) {
    const myDate = new Date(date);
    const month = months[myDate.getUTCMonth()];
    return myDate.getUTCDate() + " " + month + " " + myDate.getUTCFullYear();
  }
  return "";
};

export const newOffsetDate = () => {
  const date = new Date();
  date.setUTCHours(date.getUTCHours() + 4);
  return date;
};
