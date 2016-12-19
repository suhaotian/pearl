
export default function leadingZero(n) {
  return (''+n).length < 2 ? '0'+n : n
}
