import TestConnection from './test-connection'

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">5-Year Tracker</h1>
      <TestConnection />
    </main>
  )
}