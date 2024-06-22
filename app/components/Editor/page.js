// components/Editor.js
export default function Editor({ content, onchange }) {
    return (
      <textarea
        value={content}
        onChange={(e) => onchange(e.target.value)}
        className="w-full h-full p-2"
      />
    );
  }
  
  

  

  
