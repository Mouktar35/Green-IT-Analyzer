// import axios from 'axios'
// import type { AnalysisResult } from '../types.d'


// const api = axios.create({
// baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:8080/api',
// timeout: 20000,
// })


// export async function analyzeCode(code: string, language: string): Promise<AnalysisResult> {
// const res = await api.post('/analyze', { code, language })
// return res.data as AnalysisResult
// }


// export default api