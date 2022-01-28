export const ThrowingFetch = async (
  url: string,
  options?: RequestInit
): Promise<any> => {
  const res = await fetch(url, options)
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    try {
      error.message = await res.json()
    } catch (_) {
      error.message = await res.text()
    }
    throw error
  }
  try {
    return res.json()
  } catch (_) {
    return res.text()
  }
}
