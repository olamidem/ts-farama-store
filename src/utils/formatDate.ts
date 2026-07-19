export function formatDate(date?: string, includeTime = false) {
  if (!date) return "N/A";

  const d = new Date(date);

  if (Number.isNaN(d.getTime())) {
    return date;
  }

  if (includeTime) {
    return (
      d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }) +
      " " +
      d.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }

  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
