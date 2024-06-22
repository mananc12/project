// components/Editor.js
export default function Editor({ content, onChange }) {
    return (
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-full p-2"
      />
    );
  }
  
  

  

  