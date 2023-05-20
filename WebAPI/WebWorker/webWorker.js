// self references to web worker
self.onmessage = event => {
  console.log(event.data)

  const result = doSomeIntensiveWork()

  self.postMessage(result)
}

const doSomeIntensiveWork = () => {
  let sum = 0

  for (let i = 1; i < 1000000000; ++i) {
    sum += i
  }

  return sum
}
