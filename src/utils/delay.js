export default function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve()
    }, ms)
  })
}