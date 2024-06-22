"use client"
import { useState } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from '@mui/icons-material/Delete';

export default function Sidebar({
  files, // Array of files and folders to display in the sidebar
  onFileClick, // Function to handle file click event
  onAddFile, // Function to handle adding a new file
  onAddFolder, // Function to handle adding a new folder
  onDelete, // Function to handle deleting a file or folder
  onFolderClick, // Function to handle folder click event
  selectedFolder, // Currently selected folder
}) {
  const [newItem, setNewItem] = useState(""); // State to manage the name of the new file or folder

  // Function to handle adding a new file
  const handleAddFile = () => {
    onAddFile(newItem, selectedFolder); // Call the onAddFile function with newItem and selectedFolder
    setNewItem(""); // Clear the input field after adding the file
  };

  // Function to handle adding a new folder
  const handleAddFolder = () => {
    onAddFolder(newItem, selectedFolder); // Call the onAddFolder function with newItem and selectedFolder
    setNewItem(""); // Clear the input field after adding the folder
  };

  // Function to handle deleting a file or folder
  const handleDelete = (item) => {
    if (window.confirm(`Are you sure you want to delete ${item.name}?`)) { // Confirm before deleting
      onDelete(item); // Call the onDelete function with the item to delete
    }
  };

  return (
    <div className="w-72 bg-gray-800 text-white p-4"> {/* Sidebar container */}
      <h2 className="text-xl mb-4">Files</h2> {/* Sidebar title */}
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)} // Update newItem state on input change
        placeholder="New file or folder" // Placeholder text for input
        className="mb-2 p-1 w-full text-black" // Styling for input
      />
      <div className="mb-4 flex justify-center items-center"> {/* Container for add buttons */}
        <button onClick={handleAddFile} className="mr-2 bg-blue-500 p-1"> {/* Add file button */}
          Add File <InsertDriveFileIcon />
        </button>
        <button onClick={handleAddFolder} className="bg-green-500 p-1"> {/* Add folder button */}
          Add Folder <FolderIcon />
        </button>
      </div>
      <ul>
        {files.map((file) => ( // Iterate over files and folders
          <li
            key={file.name}
            className={`cursor-pointer ${file === selectedFolder ? 'bg-gray-600' : ''}`} // Conditional styling for selected folder
          >
            <div
              className={`bg-white text-gray-800 mb-2 p-1 flex justify-between items-center ${file === selectedFolder ? 'bg-gray-600 text-white' : ''}`} // Conditional styling for selected folder
              onClick={() => file.type === 'folder' ? onFolderClick(file) : onFileClick(file)} // Handle click event
            >
              <div>
                {file.icon} {/* Display file or folder icon */}
                {file.name} {/* Display file or folder name */}
              </div>
              <DeleteIcon onClick={() => handleDelete(file)} className="text-red-500 cursor-pointer" /> {/* Delete icon */}
            </div>
            {file.type === 'folder' && file.children && ( // If the file is a folder and has children
              <ul className="pl-4"> {/* Indented list for folder contents */}
                {file.children.map((child) => ( // Iterate over children of the folder
                  <li
                    key={child.name}
                    className={`cursor-pointer ${child === selectedFolder ? 'bg-gray-600' : ''}`} // Conditional styling for selected child folder
                  >
                    <div className="bg-white text-gray-800 mb-2 p-1 flex justify-between items-center">
                      <div onClick={() => onFileClick(child)}>
                        {child.icon} {/* Display child file or folder icon */}
                        {child.name} {/* Display child file or folder name */}
                      </div>
                      <DeleteIcon onClick={() => handleDelete(child)} className="text-red-500 cursor-pointer" /> {/* Delete icon for child */}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
