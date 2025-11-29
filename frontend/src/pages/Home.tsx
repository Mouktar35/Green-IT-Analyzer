import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      {/* Header / Hero Section */}
      <section className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-2xl shadow-lg p-10 mb-10 text-center w-full max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">GreenIT Analyzer</h1>
        <p className="text-lg md:text-xl mb-6">
          Analysez votre code pour détecter des anti-patterns énergivores et obtenez des suggestions d'amélioration.
        </p>
        <Link
          to="/analyzer"
          className="inline-block bg-white text-green-700 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition"
        >
          Commencer l'analyse
        </Link>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-6 w-full max-w-5xl">
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition transform hover:-translate-y-1 text-center">
          <h3 className="font-bold text-lg mb-2 text-green-700">Boucles I/O</h3>
          <p className="text-gray-600 text-sm">
            Détecte les lectures/écritures répétées non-bufferisées.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition transform hover:-translate-y-1 text-center">
          <h3 className="font-bold text-lg mb-2 text-green-700">Concaténation de chaînes</h3>
          <p className="text-gray-600 text-sm">
            Repère les concaténations coûteuses (ex: boucle + +=).
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition transform hover:-translate-y-1 text-center">
          <h3 className="font-bold text-lg mb-2 text-green-700">Exceptions mal utilisées</h3>
          <p className="text-gray-600 text-sm">
            Signale l'usage d'exceptions pour le contrôle de flux normal.
          </p>
        </div>
      </section>
    </main>
  )
}
