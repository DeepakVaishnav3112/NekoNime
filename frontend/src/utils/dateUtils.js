export const formatAnimeDate = (startDate) => {
  if (!startDate) return "";
  const { day, month, year } = startDate;
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${months[month - 1] ?? ""} ${day ?? ""}, ${year ?? ""}`;
};
