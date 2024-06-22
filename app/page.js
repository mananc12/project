// pages/index.js
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
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [content, setContent] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);

  const handleFileClick = (file) => {
    setSelectedFile(file);
    setContent(file.content || "");
    setSelectedFolder(null);
  };

  const handleFolderClick = (folder) => {
    setSelectedFolder(selectedFolder === folder ? null : folder);
    setSelectedFile(null);
  };

  const handleAddFile = (name, parentFolder = null) => {
    const icon = determineIcon(name);
    const newFile = { name, type: "file", content: "", icon };
    if (parentFolder) {
      parentFolder.children = parentFolder.children || [];
      parentFolder.children.push(newFile);
      setFiles([...files]);
    } else {
      setFiles([...files, newFile]);
    }
  };

  const handleAddFolder = (name, parentFolder = null) => {
    const newFolder = {
      name,
      type: "folder",
      content: "",
      icon: <FolderIcon />,
      children: [],
    };
    if (parentFolder) {
      parentFolder.children = parentFolder.children || [];
      parentFolder.children.push(newFolder);
      setFiles([...files]);
    } else {
      setFiles([...files, newFolder]);
    }
  };

  const handleDelete = (item) => {
    const deleteRecursive = (files, item) => {
      return files.filter((file) => {
        if (file === item) {
          return false;
        }
        if (file.type === "folder" && file.children) {
          file.children = deleteRecursive(file.children, item);
        }
        return true;
      });
    };
    setFiles(deleteRecursive(files, item));
    if (item === selectedFile) {
      setSelectedFile(null);
      setContent("");
    }
    if (item === selectedFolder) {
      setSelectedFolder(null);
    }
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
    const updatedFiles = files.map((file) =>
      file === selectedFile ? { ...file, content: newContent } : file
    );
    setFiles(updatedFiles);
  };

  const determineIcon = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
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
        files={files}
        onFileClick={handleFileClick}
        onAddFile={handleAddFile}
        onAddFolder={handleAddFolder}
        onDelete={handleDelete}
        onFolderClick={handleFolderClick}
        selectedFolder={selectedFolder}
      />
      <div className="flex-grow p-4">
        {selectedFile ? (
          <>
            {selectedFile.name.endsWith(".ed") && (
              <Editor
                initialContent={content}
                onContentChange={handleContentChange}
              />
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
                <span className="font-semibold">- .note files:</span> Opens a
                note maker for creating and categorizing notes with drag-and-drop
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
          </div>
        )}
      </div>
    </div>
  );
}
