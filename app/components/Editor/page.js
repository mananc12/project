// components/Editor.js
"use client"; // Ensure this is a client component

import { useState, useEffect } from 'react';

export default function Editor({ initialContent, onContentChange }) {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setContent(initialContent); // Update content when initialContent changes
  }, [initialContent]);

  const handleChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    onContentChange(newContent); // Notify parent component about the change
  };

  return (
    <textarea
      value={content}
      onChange={handleChange}
      className="w-full h-full p-2"
    />
  );
}
