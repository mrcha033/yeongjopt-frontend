import ChatInterface from './components/ChatInterface'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">YeongJOPT</h1>
        <ChatInterface />
      </div>
    </div>
  )
}

export default App 