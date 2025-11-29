export async function analyzeCode(code, language) {
const res = await fetch("http://localhost:8080/api/analyze", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ code, language })
});
return res.json();
}