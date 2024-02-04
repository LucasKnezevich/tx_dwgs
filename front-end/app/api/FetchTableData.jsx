export const FetchTableData = async (table) => {
  try {
    const response = await fetch('https://txdwgs-api.onrender.com/tables', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        table
      })
    })
    const jsonData = await response.json()
    return jsonData
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
