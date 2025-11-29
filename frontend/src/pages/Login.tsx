import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Login() {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const navigate = useNavigate()


const handleSubmit = (e: React.FormEvent) => {
e.preventDefault()
// ici tu peux appeler backend /auth
// pour demo on redirige
navigate('/analyzer')
}


return (
<div className="min-h-screen flex items-center justify-center">
<form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-full max-w-md">
<h2 className="text-2xl font-bold mb-4 text-center">Connexion</h2>
<input className="w-full border rounded px-3 py-2 mb-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
<input type="password" className="w-full border rounded px-3 py-2 mb-3" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
<button className="w-full bg-green-600 text-white px-3 py-2 rounded">Se connecter</button>
</form>
</div>
)
}