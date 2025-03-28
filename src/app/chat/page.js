import Chat from '../../components/Chat';

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-4">
        <h1 className="text-3xl font-bold text-center mb-8">OpenAI Chatbot</h1>
        <div className="bg-white rounded-lg shadow-lg h-[87vh] overflow-hidden">
          <Chat />
        </div>
      </main>
    </div>
  );
}