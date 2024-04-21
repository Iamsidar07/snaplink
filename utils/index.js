export const validateURL = (url) => {
  const urlPattern = new RegExp(
    /^(?:http|https?):\/\/(?:\w+\.)+\w{2,}(?:\/\S*)?$/i,
  );

  return urlPattern.test(url);
};

export function formatDate(date) {
  const months = [
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
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const month = months[monthIndex];
  return `${day} ${month}`;
}
