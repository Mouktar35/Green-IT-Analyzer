import React from 'react'
import Editor from '@monaco-editor/react'


interface Props {
code: string
setCode: (c: string) => void
language: string
}


export default function CodeEditor({ code, setCode, language }: Props) {
// map language to monaco
const monacoLang = language === 'javascript' ? 'javascript' : language === 'python' ? 'python' : 'java'


return (
<div className="border rounded">
<Editor
height="360px"
language={monacoLang}
value={code}
onChange={(v) => setCode(v || '')}
theme="vs-dark"
options={{ minimap: { enabled: false } }}
/>
</div>
)
}