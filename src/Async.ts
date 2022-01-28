export async function sleep(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(seconds)
    }, seconds * 1000)
  })
}
