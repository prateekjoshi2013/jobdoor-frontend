export default function (str) {
  const w = str.split(' ');
  return `${w[0].charAt(0).toUpperCase() + w[0].slice(1)} ${w[1].charAt(0).toUpperCase() + w[1].slice(1)}`;
}
