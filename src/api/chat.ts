interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export async function sendChat(messages: Message[]) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer fake'
      },
      body: JSON.stringify({
        model: 'yeongjopt-mistral-7b',
        messages
      })
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending chat:', error);
    throw error;
  }
} 