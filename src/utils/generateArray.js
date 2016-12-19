export default function generateArray(start, end, handler=function(m){return m}) {
  let t = []
  for (;start <= end; start++) {
    t.push(handler(start))
  }

  return t
}
