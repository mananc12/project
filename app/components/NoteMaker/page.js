// components/NoteMaker.js
"use client"; // Using client-side rendering

import { useState } from 'react'; // Importing useState hook from React
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'; // Importing drag and drop components

const initialNotes = []; // Initial empty array for notes

const statuses = ['todo', 'in-progress', 'done']; // Array defining different statuses for notes

export default function NoteMaker() {
  const [notes, setNotes] = useState(initialNotes); // State to manage notes array

  // Function to handle drag end event
  const handleDragEnd = (result) => {
    if (!result.destination) return; // Do nothing if dropped outside the list

    const updatedNotes = Array.from(notes); // Create a copy of notes array
    const [movedNote] = updatedNotes.splice(result.source.index, 1); // Remove the dragged item from its original position
    movedNote.status = result.destination.droppableId; // Set the new status of the dragged item
    updatedNotes.splice(result.destination.index, 0, movedNote); // Insert the dragged item into the new position

    setNotes(updatedNotes); // Update state with the modified notes array
  };

  // Function to handle adding a new note
  const handleAddNote = (content) => {
    setNotes([...notes, { id: `note-${notes.length + 1}`, content, status: 'todo' }]); // Add a new note with unique ID and 'todo' status
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Notes</h2>
      {/* Input field to add a new note */}
      <input
        type="text"
        placeholder="Add a new note"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.target.value.trim()) {
            handleAddNote(e.target.value); // Call handleAddNote function when Enter key is pressed
            e.target.value = ''; // Clear input field after adding note
          }
        }}
        className="mb-4 p-2 border w-full"
      />
      {/* Drag and drop context for notes */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex space-x-4">
          {/* Map through statuses to create droppable areas */}
          {statuses.map((status, statusIndex) => (
            <Droppable key={status} droppableId={status}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`flex-1 p-2 border bg-gray-700 ${snapshot.isDraggingOver ? 'bg-gray-100' : ''}`}
                >
                  {/* Display status as title */}
                  <h3 className="text-lg text-white font-semibold mb-2 capitalize">{status.replace('-', ' ')}</h3>
                  {/* Map through notes to create draggable items */}
                  {notes
                    .filter((note) => note.status === status)
                    .map((note, index) => (
                      <Draggable key={note.id} draggableId={note.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`p-2 mb-2 border font-semibold bg-white ${
                              snapshot.isDragging ? 'bg-yellow-600 text-black' : ''
                            }`}
                          >
                            {note.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder} {/* Placeholder for dropped items */}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
