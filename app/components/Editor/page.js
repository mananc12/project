// components/Editor.js
"use client";
export default function Editor(props) {
    return (
      <textarea
        value={props.content}
        onChange={(e) => props.onChange(e.target.value)}
        className="w-full h-full p-2"
      />
    );
  }
  
  

  

  
