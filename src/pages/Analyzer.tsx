import { useState } from "react";
import LanguageSelector from "../compenents/LanguageSelector";
import CodeEditor from "../compenents/CodeEditor";

export default function AnalyzerPage() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://localhost:8080/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Erreur:", err);
      setResult({
        issues: ["Impossible d’analyser le code (erreur serveur)"],
        suggestions: [],
        optimizedCode: "",
      });
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8">
        {/* === Code Input Section === */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Entrez votre code</h2>
            <LanguageSelector value={language} onChange={setLanguage} />
          </div>

          <CodeEditor code={code} setCode={setCode} language={language} />

          <button
            onClick={handleAnalyze}
            className="mt-4 w-full bg-green-600 hover:bg-green-700 transition-colors text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg"
          >
            {loading ? "Analyse en cours..." : "Analyser"}
          </button>
        </div>

        {/* === Results Section === */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Résultats</h2>

          {result ? (
            <div className="space-y-6">
              {result.issues && result.issues.length > 0 && (
                <div>
                  <h3 className="font-semibold text-red-600 mb-2">Problèmes détectés</h3>
                  <ul className="list-disc ml-6 text-gray-700">
                    {result.issues.map((i: string, idx: number) => (
                      <li key={idx}>{i}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result.suggestions && result.suggestions.length > 0 && (
                <div>
                  <h3 className="font-semibold text-green-700 mb-2">Suggestions</h3>
                  <ul className="list-disc ml-6 text-gray-700">
                    {result.suggestions.map((s: string, idx: number) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result.optimizedCode && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Code optimisé</h3>
                  <pre className="bg-gray-900 text-white p-4 rounded-xl h-48 overflow-auto">
                    {result.optimizedCode}
                  </pre>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-4">
              Aucun résultat pour le moment. Cliquez sur "Analyser" pour lancer l'analyse.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
