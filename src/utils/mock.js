import delay from './delay'

export default function mock(data, ms) {
  return delay(ms).then(() => (data))
}