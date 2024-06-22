// components/ReadmePreview.js
"use client"; // Using client-side rendering

import { useState } from 'react'; // Importing useState hook from React
import { marked } from 'marked'; // Importing 'marked' function for markdown parsing

export default function ReadmePreview({ content }) {
  const [rawContent, setRawContent] = useState(content); // State to manage raw README content

  // Function to handle content change in textarea
  const handleContentChange = (e) => {
    setRawContent(e.target.value); // Update rawContent state with new content from textarea
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">README Preview</h2>
      {/* Textarea for entering and editing README content */}
      <textarea
        value={rawContent}
        onChange={handleContentChange}
        className="w-full h-40 p-2 mb-4 border"
        placeholder="Enter README content"
      />
      {/* Div to display rendered markdown content */}
      <div
        className="bg-white p-2 border"
        dangerouslySetInnerHTML={{ __html: marked(rawContent) }}
      />
    </div>
  );
}
