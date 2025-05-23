const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/v1'

export async function sendChat(messages) {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'yeongjopt-mistral-7b',
        messages
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error sending chat:', error)
    throw error
  }
} 