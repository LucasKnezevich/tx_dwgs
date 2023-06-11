export const FetchQueryData = async (query) => {
  try {
    const response = await fetch('https://txdwgs-api.onrender.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query
      })
    })
    const jsonData = await response.json()
    return jsonData
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
