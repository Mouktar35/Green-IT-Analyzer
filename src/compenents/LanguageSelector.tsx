import React from 'react'


interface Props {
value: string
onChange: (l: string) => void
}


export default function LanguageSelector({ value, onChange }: Props) {
return (
<select
value={value}
onChange={(e) => onChange(e.target.value)}
className="border rounded px-3 py-2"
>
<option value="javascript">JavaScript</option>
<option value="python">Python</option>
<option value="java">Java</option>
</select>
)
}