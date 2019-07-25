export function formatDateTime(timestamp) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(timestamp);
}

// returns
export function sixDigitNumber() {
  return Math.floor(Math.random() * 899999 + 10000);
}
