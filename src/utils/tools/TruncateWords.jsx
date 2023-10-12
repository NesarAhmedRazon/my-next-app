export const TruncateWords = ({ sentence, amount, tail = "..." }) => {
  const words = sentence.split(" ");
  if (amount >= words.length) {
    return sentence;
  }

  const truncated = words.slice(0, amount);
  return `${truncated.join(" ")}${tail}`;
};
