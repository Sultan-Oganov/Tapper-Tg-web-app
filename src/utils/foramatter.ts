export const formatterNumber = (number: number, lng = "en") =>
  Intl.NumberFormat(lng, {
    notation: "compact",
  }).format(number);
