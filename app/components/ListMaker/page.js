// components/ListMaker.js
"use client"; // Using client-side rendering

import { useState } from 'react'; // Importing useState hook from React

export default function ListMaker() {
  const [lists, setLists] = useState([]); // State to manage lists

  // Function to handle adding a new list
  const handleAddList = (listName) => {
    if (listName.trim()) {
      // Add a new list with unique ID and empty items array
      setLists([...lists, { id: `list-${lists.length + 1}`, name: listName, items: [] }]);
    }
  };

  // Function to handle adding an item to a list
  const handleAddItem = (listId, itemName) => {
    // Update lists state by mapping through and updating the items of the list with matching ID
    setLists(lists.map(list => {
      if (list.id === listId) {
        return { ...list, items: [...list.items, itemName] }; // Add new item to the items array
      }
      return list; // Return unchanged list if ID doesn't match
    }));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Lists</h2>
      {/* Input for adding a new list */}
      <input
        type="text"
        placeholder="Add a new list"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.target.value.trim()) {
            handleAddList(e.target.value); // Call handleAddList on Enter key press
            e.target.value = ''; // Clear input field after adding list
          }
        }}
        className="mb-4 p-2 border w-full"
      />
      <div className="space-y-4">
        {/* Displaying all lists */}
        {lists.map((list) => (
          <div key={list.id} className="border p-4">
            <h3 className="text-lg mb-2">{list.name}</h3>
            <ul className="mb-2">
              {/* Displaying items of each list */}
              {list.items.map((item, index) => (
                <li key={index} className="p-1">{item}</li>
              ))}
            </ul>
            {/* Input for adding new items to the list */}
            <input
              type="text"
              placeholder={`Add item to ${list.name}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  handleAddItem(list.id, e.target.value); // Call handleAddItem on Enter key press
                  e.target.value = ''; // Clear input field after adding item
                }
              }}
              className="p-2 border w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
