"use client";
import { useState } from "react";
import Sidebar from "./components/Sidebar/page";
import Editor from "./components/Editor/page";
import NoteMaker from "./components/NoteMaker/page";
import ListMaker from "./components/ListMaker/page";
import ReadmePreview from "./components/ReadmePreview/page";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ChromeReaderModeIcon from "@mui/icons-material/ChromeReaderMode";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import BorderColorIcon from "@mui/icons-material/BorderColor";

export default function Home() {
  // State to store the list of files and folders
  const [files, setFiles] = useState([]);
  // State to store the currently selected file
  const [selectedFile, setSelectedFile] = useState(null);
  // State to store the content of the selected file
  const [content, setContent] = useState("");
  // State to store the currently selected folder
  const [selectedFolder, setSelectedFolder] = useState(null);

  // Function to handle file click event
  const handleFileClick = (file) => {
    setSelectedFile(file); // Set the clicked file as the selected file
    setContent(file.content || ""); // Set the content of the selected file
    setSelectedFolder(null); // Deselect any selected folder
  };

  // Function to handle folder click event
  const handleFolderClick = (folder) => {
    setSelectedFolder(selectedFolder === folder ? null : folder); // Toggle folder selection
    setSelectedFile(null); // Deselect any selected file
  };

  // Function to handle adding a new file
  const handleAddFile = (name, parentFolder = null) => {
    const icon = determineIcon(name); // Determine the icon based on the file extension
    const newFile = { name, type: "file", content: "", icon }; // Create a new file object
    if (parentFolder) {
      parentFolder.children = parentFolder.children || [];
      parentFolder.children.push(newFile); // Add the new file to the parent folder's children
      setFiles([...files]); // Update the state with the new file structure
    } else {
      setFiles([...files, newFile]); // Add the new file to the root level
    }
  };

  // Function to handle adding a new folder
  const handleAddFolder = (name, parentFolder = null) => {
    const newFolder = {
      name,
      type: "folder",
      content: "",
      icon: <FolderIcon />,
      children: [],
    }; // Create a new folder object
    if (parentFolder) {
      parentFolder.children = parentFolder.children || [];
      parentFolder.children.push(newFolder); // Add the new folder to the parent folder's children
      setFiles([...files]); // Update the state with the new folder structure
    } else {
      setFiles([...files, newFolder]); // Add the new folder to the root level
    }
  };

  // Function to handle deleting a file or folder
  const handleDelete = (item) => {
    // Recursive function to delete a file or folder
    const deleteRecursive = (files, item) => {
      return files.filter((file) => {
        if (file === item) {
          return false; // Filter out the item to be deleted
        }
        if (file.type === "folder" && file.children) {
          file.children = deleteRecursive(file.children, item); // Recursively delete from the children
        }
        return true;
      });
    };
    setFiles(deleteRecursive(files, item)); // Update the state with the new file structure
    if (item === selectedFile) {
      setSelectedFile(null); // Deselect the file if it was deleted
      setContent("");
    }
    if (item === selectedFolder) {
      setSelectedFolder(null); // Deselect the folder if it was deleted
    }
  };

  // Function to handle content change in the editor
  const handleContentChange = (newContent) => {
    setContent(newContent); // Update the content state
    const updatedFiles = files.map((file) =>
      file === selectedFile ? { ...file, content: newContent } : file
    );
    setFiles(updatedFiles); // Update the state with the new content
  };

  // Function to determine the icon based on the file extension
  const determineIcon = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase(); // Get the file extension
    switch (extension) {
      case "ed":
        return <EditNoteIcon />;
      case "note":
        return <BorderColorIcon />;
      case "lt":
        return <FormatListBulletedIcon />;
      case "readme":
        return <ChromeReaderModeIcon />;
      default:
        return <InsertDriveFileIcon />;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        files={files} // Pass the files to the Sidebar component
        onFileClick={handleFileClick} // Pass the file click handler to the Sidebar component
        onAddFile={handleAddFile} // Pass the add file handler to the Sidebar component
        onAddFolder={handleAddFolder} // Pass the add folder handler to the Sidebar component
        onDelete={handleDelete} // Pass the delete handler to the Sidebar component
        onFolderClick={handleFolderClick} // Pass the folder click handler to the Sidebar component
        selectedFolder={selectedFolder} // Pass the selected folder state to the Sidebar component
      />
      <div className="flex-grow p-4">
        {selectedFile ? (
          <>
            {selectedFile.name.endsWith(".ed") && (
              <Editor content={content} onchange={handleContentChange} />
            )}
            {selectedFile.name.endsWith(".note") && <NoteMaker />}
            {selectedFile.name.endsWith(".lt") && <ListMaker />}
            {selectedFile.name.endsWith(".readme") && (
              <ReadmePreview content={content} />
            )}
          </>
        ) : (
          <div>
            1. Create files/folders.
            <br />
            2. Select a file to view its content.
            <br />
            3. File Types and Functionality:
            <ul>
              <li>
                <span className="font-semibold">- .ed files:</span> Opens a text
                editor for editing text files.
              </li>
              <li>
                <span className="font-semibold">- .note files:</span> Opens a note
                maker for creating and categorizing notes with drag-and-drop
                functionality.
              </li>
              <li>
                <span className="font-semibold">- .lt files:</span> Opens a
                list-making interface for creating lists.
              </li>
              <li>
                <span className="font-semibold">- .readme files:</span> Opens an
                interface to preview README files without markup.
              </li>
            </ul>
          </div> // Message when no file is selected
        )}
      </div>
    </div>
  );
}
