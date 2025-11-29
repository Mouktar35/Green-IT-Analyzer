import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config.js';

// Initialize Gemini AI with API key
const genAI = new GoogleGenerativeAI(config.geminiApiKey);

/**
 * Analyzes code snippet for GreenIT issues using Gemini 1.5 Flash
 * @param {string} code - The code snippet to analyze
 * @returns {Promise<Object>} Analysis result with issues, ecoScore, and summary
 */
export async function analyzeCodeWithGemini(code) {
  try {
    // Initialize Gemini 1.5 Flash model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // Construct the GreenIT analysis prompt
    const prompt = `Tu es un expert analyste GreenIT (Green Software). Analyse le code suivant et détecte les inefficacités environnementales.

Concentre-toi sur ces 3 problèmes critiques de GreenIT :

1. **Opérations I/O dans les boucles** : Requêtes de base de données, lectures de fichiers, appels API, ou requêtes réseau à l'intérieur de boucles
2. **Mauvaise concaténation de chaînes** : Utilisation de l'opérateur + dans les boucles au lieu de StringBuilder/StringBuffer (Java) ou array.join (JS) ou méthodes efficaces similaires
3. **Exceptions pour le contrôle de flux** : Utilisation d'exceptions pour la logique normale au lieu de validations

Pour chaque problème trouvé :
- Identifie la ligne exacte ou le pattern
- Explique pourquoi c'est inefficace (gaspillage CPU, mémoire, énergie)
- Fournis le code optimisé corrigé

Calcule un **ecoScore** de 0 à 100 :
- 100 = Parfait, aucun problème
- 70-99 = Problèmes mineurs
- 40-69 = Problèmes modérés
- 0-39 = Problèmes majeurs

Réponds STRICTEMENT dans ce format JSON (pas de markdown, pas de texte supplémentaire) :
{
  "issues": [
    {
      "type": "I/O dans une boucle" | "Mauvaise concaténation" | "Mauvaise utilisation d'exceptions",
      "line": "extrait de code problématique",
      "impact": "explication du gaspillage",
      "optimizedCode": "code corrigé et optimisé"
    }
  ],
  "ecoScore": nombre (0-100),
  "scoreDisplay": "30/100" (format: score/100),
  "summary": "évaluation globale brève"
}

Code à analyser :
\`\`\`
${code}
\`\`\`

Retourne uniquement du JSON valide.`;

    // Generate content with Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse JSON response
    let analysisResult;
    try {
      // Remove markdown code blocks if present
      const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      analysisResult = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('Failed to parse Gemini response as JSON:', text);
      throw new Error('Invalid JSON response from Gemini API');
    }

    // Validate response structure
    if (!analysisResult.issues || !analysisResult.ecoScore || !analysisResult.summary) {
      throw new Error('Incomplete analysis response from Gemini');
    }

    // Add scoreDisplay if not present
    if (!analysisResult.scoreDisplay) {
      analysisResult.scoreDisplay = `${analysisResult.ecoScore}/100`;
    }

    return analysisResult;

  } catch (error) {
    console.error('Gemini API Error:', error.message);
    throw new Error(`Failed to analyze code: ${error.message}`);
  }
}
