// components/Sidebar.js
"use client";
import { useState } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from '@mui/icons-material/Delete';

export default function Sidebar({
  files,
  onFileClick,
  onAddFile,
  onAddFolder,
  onDelete,
  onFolderClick,
  selectedFolder,
}) {
  const [newItem, setNewItem] = useState("");

  const handleAddFile = () => {
    onAddFile(newItem, selectedFolder);
    setNewItem("");
  };

  const handleAddFolder = () => {
    onAddFolder(newItem, selectedFolder);
    setNewItem("");
  };

  const handleDelete = (item) => {
    if (window.confirm(`Are you sure you want to delete ${item.name}?`)) {
      onDelete(item);
    }
  };

  return (
    <div className="w-72 bg-gray-800 text-white p-4">
      <h2 className="text-xl mb-4">Files</h2>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="New file or folder"
        className="mb-2 p-1 w-full text-black"
      />
      <div className="mb-4 flex justify-center items-center">
        <button onClick={handleAddFile} className="mr-2 bg-blue-500 p-1">
          Add File <InsertDriveFileIcon />
        </button>
        <button onClick={handleAddFolder} className="bg-green-500 p-1">
          Add Folder <FolderIcon />
        </button>
      </div>
      <ul>
        {files && files.length > 0 ? ( // Check if files is defined and not empty
          files.map((file) => (
            <li
              key={file.name}
              className={`cursor-pointer ${file === selectedFolder ? 'bg-gray-600' : ''}`}
            >
              <div
                className={`bg-white text-gray-800 mb-2 p-1 flex justify-between items-center ${file === selectedFolder ? 'bg-gray-600 text-white' : ''}`}
                onClick={() => file.type === 'folder' ? onFolderClick(file) : onFileClick(file)}
              >
                <div>
                  {file.icon}
                  {file.name}
                </div>
                <DeleteIcon onClick={() => handleDelete(file)} className="text-red-500 cursor-pointer" />
              </div>
              {file.type === 'folder' && file.children && (
                <ul className="pl-4">
                  {file.children.map((child) => (
                    <li
                      key={child.name}
                      className={`cursor-pointer ${child === selectedFolder ? 'bg-gray-600' : ''}`}
                    >
                      <div className="bg-white text-gray-800 mb-2 p-1 flex justify-between items-center">
                        <div onClick={() => onFileClick(child)}>
                          {child.icon}
                          {child.name}
                        </div>
                        <DeleteIcon onClick={() => handleDelete(child)} className="text-red-500 cursor-pointer" />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))
        ) : (
          <li>No files or folders available.</li>
        )}
      </ul>
    </div>
  );
}
