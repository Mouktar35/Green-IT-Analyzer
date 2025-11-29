import { Link } from 'react-router-dom'


export default function Navbar() {
return (
<header className="bg-white shadow-md">
<div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
<Link to="/" className="text-xl font-bold text-green-600">GreenIT Analyzer</Link>
<nav className="flex gap-4">
<Link to="/analyzer" className="hover:text-green-600">Analyser</Link>
<Link to="/" className="hover:text-green-600">Accueil</Link>
<Link to="/login" className="hover:text-green-600">Se connecter</Link>
</nav>
</div>
</header>
)
}