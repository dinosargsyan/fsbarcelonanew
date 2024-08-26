'use client'

import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor from "jodit-react";
import { db, storage } from "../../app/firebaseConfig";
import {
  addDoc,
  collection,
  getFirestore,
  query,
  orderBy,
  limit,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import {EditIcon} from "./EditIcon";
import {EyeIcon} from "./EyeIcon";
import {DeleteIcon} from "./DeleteIcon";

import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell, getKeyValue} from "@nextui-org/table";
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter, useDisclosure} from "@nextui-org/modal";
import {Tooltip} from "@nextui-org/tooltip";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Existing code...

// Modal component for displaying posts
const ViewPostModal = ({ post, onClose }) => (
  <div className="modal">
    <div className="modal-content">
      <h2>{post.title}</h2>
      <p>{post.article}</p>
      <img src={post.imageURL[0]} alt="Post Image" />
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);

// Modal component for editing posts
const EditPostModal = ({ post, onClose, onSave }) => {
  const [title, setTitle] = useState(post.title);
  const [article, setArticle] = useState(post.article);
  const [tags, setTags] = useState(post.tags.join(", "));
  const [publishDate, setPublishDate] =  useState(post.publishDate);

  const handleSave = () => {
    onSave({ ...post, title, article, tags: tags.split(", ") });
    onClose();
  };
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const editorConfig = {
    readonly: false,
    toolbar: true,
    spellcheck: true,
    language: "en",
    toolbarButtonSize: "medium",
    toolbarAdaptive: false,
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
    askBeforePasteHTML: true,
    askBeforePasteFromWord: true,
    //defaultActionOnPaste: "insert_clear_html",
    uploader: {
      insertImageAsBase64URI: true
    },
    width: 1000,
    height: 600
  };
  
  return (
    
    <div className="fixed inset-0 w-full flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl max-h-[80vh] overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Edit Post</h2>
      <label>Title</label>
      <input 
        className="w-full p-2 mb-3 border border-gray-300 rounded" 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Title"
        />
        <label>Article</label>
      <div >
                <JoditEditor
                  ref={editor}
                  value={article}
                  tabIndex={1}
                  config={editorConfig}
                  onBlur={(newContent) => setArticle(newContent)}
                  onChange={() => {}} 
                />
              </div>
     
      <label>Tags</label>
      <input 
        className="w-full p-2 mb-3 border border-gray-300 rounded" 
        type="text" 
        value={tags} 
        onChange={(e) => setTags(e.target.value)} 
        placeholder="Tags"
      />
    <label>Publish date </label>
    <input
        className="w-full p-2 mb-3 border border-gray-300 rounded" 
        type="date"
        value={publishDate}
        onChange={(e) => setPublishDate(e.target.value)}
        placeholder="Date of publish" />
            
      <div className="flex justify-end space-x-4">
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" 
          onClick={handleSave}>
          Save
        </button>
        <button 
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600" 
          onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  </div>
  
    
  );
};

const columns = [
    {
      key: "title",
      label: "TITLE",
    },
    {
      key: "publishDate",
      label: "PUBLISH DATE",
    },
    {
      key: "status",
      label: "ACTIONS",
    },
  ];

// Modal component for confirming deletion
const DeletePostModal = ({ post, onClose, onDelete }) => (
  <div className="modal">
    <div className="modal-content">
      <h2>Are you sure you want to delete this post?</h2>
      <p>{post.title}</p>
      <button onClick={() => onDelete(post)}>Yes, Delete</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  </div>
);

const Example: React.FC<ExampleProps> = ({ placeholder }) => {
  // Existing state and functions...

  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const {isOpen, onOpen, onClose} = useDisclosure();
  useEffect(() => {
    async function fetchPosts() {
      const q = query(collection(db, "news"), orderBy("publishDate", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchedPosts);
    }

    fetchPosts();
  }, []);

  const handleViewPost = (post) => {
    setSelectedPost(post);
    setViewModalOpen(true);
  };

  const handleEditPost = (post) => {
    onOpen();
    setSelectedPost(post);
    setEditModalOpen(true);
  };

  const handleDeletePost = (post) => {
    setSelectedPost(post);
    setDeleteModalOpen(true);
  };

  const handleSaveEdit = async (updatedPost) => {
    const postRef = doc(db, "news", updatedPost.id);
    await updateDoc(postRef, {
      title: updatedPost.title,
      article: updatedPost.article,
      tags: updatedPost.tags,
    });
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

  const handleDeleteConfirmed = async (post) => {
    const postRef = doc(db, "news", post.id);
    await deleteDoc(postRef);
    setPosts((prevPosts) => prevPosts.filter((p) => p.id !== post.id));
  };

  return (
    <section className="pb-[80px] pt-[120px]">
      {/* <div className="container mx-auto max-w-7xl px-4">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full max-w-2xl"> */}
            {/* Existing form fields... */}
            {/* <button
              onClick={handleUpload}
              className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            >
              Submit
            </button> */}

            {/* Display all posts */}
            <div className="mt-10">
              <h2>All Posts</h2>
              
              {/* {posts.map((post) => (
                <div key={post.id} className="mb-4">
                  <h3>{post.title}</h3>
                  <button onClick={() => handleViewPost(post)}>View</button>
                  <button onClick={() => handleEditPost(post)}>Edit</button>
                  <button onClick={() => handleDeletePost(post)}>Delete</button>
                </div>
              ))} */}

              

<Table aria-label="Example static collection table">
      <TableHeader>
        {columns.map((column) =>
          <TableColumn key={column.key}>{column.label}</TableColumn>
        )}
      </TableHeader>
      <TableBody>
        {posts.map((post) =>
          <TableRow key={post.id}>
            {/* {(columnKey) => <TableCell>{getKeyValue(post, columnKey)}</TableCell>} */}
            <TableCell>{getKeyValue(post, 'title')}</TableCell>
            <TableCell>{getKeyValue(post, 'publishDate')}</TableCell>
            <TableCell>
            <div className="flex space-x-2">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon onClick={() => handleViewPost(post)}/>
        </span>
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
         <EditIcon  onClick={() => handleEditPost(post)}/>
              </span>
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                 <DeleteIcon onClick={() => handleDeletePost(post)} />              
              </span>
             
            </div>
    </TableCell>
          </TableRow>
          
        )}
      </TableBody>
    </Table>
            {/* </div>
          </div>
        </div> */}
      </div>

      {/* Modals */}
      {viewModalOpen && (
        <ViewPostModal
          post={selectedPost}
          onClose={() => setViewModalOpen(false)}
        />
      )}
      {editModalOpen && (
        <EditPostModal
          post={selectedPost}
          onClose={() => setEditModalOpen(false)}
          onSave={handleSaveEdit}
        />
      )}
      {deleteModalOpen && (
        <DeletePostModal
          post={selectedPost}
          onClose={() => setDeleteModalOpen(false)}
          onDelete={handleDeleteConfirmed}
        />
      )}
    </section>
  );
};

export default Example;
