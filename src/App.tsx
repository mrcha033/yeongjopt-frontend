import React from 'react'
import ChatInterface from './components/ChatInterface'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-2xl mx-auto py-4 px-4">
          <h1 className="text-2xl font-bold text-gray-900">YeongJOPT</h1>
        </div>
      </header>
      <main>
        <ChatInterface />
      </main>
    </div>
  )
}

export default App 