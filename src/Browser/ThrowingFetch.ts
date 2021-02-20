export const ThrowingFetch = async (url: string): Promise<any> => {
  const res = await fetch(url)
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    error.message = await res.json()
    throw error
  }
  return res.json()
}

export default ThrowingFetch
