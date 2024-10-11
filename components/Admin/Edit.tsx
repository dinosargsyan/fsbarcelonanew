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
import { ref, uploadBytes, getDownloadURL, deleteObject, getStorage, refFromURL } from "firebase/storage";

// Existing code...

// Modal component for displaying posts
const ViewPostModal = ({ post }) => {
    useEffect(() => {
      const url = `https://fsbarcelona.org/blog/${post.id}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }, [post.id]);
  
    return null; // This component doesn't need to render anything
  };

// Modal component for editing posts
const EditPostModal = ({ post, onClose, onSave }) => {
  const [title, setTitle] = useState(post.title);
  const [article, setArticle] = useState(post.article);
  const [tags, setTags] = useState(post.tags.join(", "));
  const [publishDate, setPublishDate] =  useState(post.publishDate);
  const [imageURL, setImageURL] = useState(post.imageURL);
  const [files, setFiles] = useState<FileList | null>(null);

  const handleSave = () => {
    onSave({ ...post, title, imageURL, article, tags: tags.split(", ") });
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

  const deleteFromFirebase = (url) => {
    
    const desertRef = ref(storage, url);
    deleteObject(desertRef).then(() => {
      console.log('desertRef', desertRef);
      setImageURL((imageURL) => imageURL.filter(urls => urls !== url));
      
    }).catch((error) => {
      console.log('Error exav chjnjvec')
    });
  };
  

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(event.target.files);
    handleUpload()
  };

  const handleUpload = async () => {
    if (!files || files.length === 0) return;

    const uploadedURLs: string[] = [];

    try {
      for (const file of Array.from(files)) {
        const storageRef = ref(storage, `images/${post.id}/${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        uploadedURLs.push(url);
        setImageURL((imageURL) => [...imageURL,  url]);
        console.log("File Uploaded Successfully", url);
      }
      // setUploadedURL(uploadedURLs);
      // handleSubmit(uploadedURLs);
    } catch (error) {
      console.error("Error uploading the files", error);
    } finally {
      // setUploading(false);
    }
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
            {imageURL.map((url, index) => (
            <div key={index} className="relative inline-block m-2">
              <img src={url} alt={`Uploaded image ${index}`} className="w-32 h-32 object-cover" />
              <button
                onClick={() => deleteFromFirebase(url)}
                className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-xs rounded-full">
                X
              </button>
            </div>
          ))}

      <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="file"
              >
                Upload Pictures
              </label>
              <input
                type="file"
                id="file"
                multiple={true}
                onChange={handleFileChange}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              />
              <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" 
          onClick={handleUpload}>
          Upload
        </button>
            </div>
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
const DeletePostModal = ({ post, onClose, onDelete }) => {
    const handleDelete = () => {
      onDelete(post); // Perform the delete action
      onClose(); // Close the modal
    };
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Are you sure you want to delete this post?
          </h2>
          <p className="text-gray-600">{post.title}</p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
            >
              Yes, Delete
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  

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
      imageURL: updatedPost.imageURL,
    });
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

//   const handleDeleteConfirmed = async (post) => {
//     const postRef = doc(db, "news", post.id);
//     await deleteDoc(postRef);
//     setPosts((prevPosts) => prevPosts.filter((p) => p.id !== post.id));
//   };



const storage = getStorage();

const handleDeleteConfirmed = async (post) => {
  try {
    // Delete the post document from Firestore
    const postRef = doc(db, "news", post.id);
    await deleteDoc(postRef);

    // Delete each associated image from Firebase Storage
    const imageUrls = post.imageURL; // Assuming imageURL is an array of image links
    const deletePromises = imageUrls.map(async (imageUrl) => {
      const imageRef = ref(storage, imageUrl); // Get a reference to each file in Storage
      return deleteObject(imageRef); // Delete the file
    });

    // Wait for all delete operations to complete
    await Promise.all(deletePromises);

    // Update the local state to remove the deleted post
    setPosts((prevPosts) => prevPosts.filter((p) => p.id !== post.id));
  } catch (error) {
    console.error("Error deleting post or images:", error);
  }
};


  return (
    <section className=" pb-[80px] ">
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
            <div>
              <h2></h2>
              
              {/* {posts.map((post) => (
                <div key={post.id} className="mb-4">
                  <h3>{post.title}</h3>
                  <button onClick={() => handleViewPost(post)}>View</button>
                  <button onClick={() => handleEditPost(post)}>Edit</button>
                  <button onClick={() => handleDeletePost(post)}>Delete</button>
                </div>
              ))} */}

              
<div>
<Table aria-label="Example colorful collection table" className="bg-blue-50" >
  <TableHeader>
    {columns.map((column) => (
      <TableColumn key={column.key} className="bg-blue-200 p-2">
        {column.label}
      </TableColumn>
    ))}
  </TableHeader>
  <TableBody>
    {posts.map((post, index) => (
      <TableRow
        key={post.id}
        className={index % 2 === 0 ? "bg-blue-100" : "bg-blue-50"}
      >
        <TableCell className="p-2 text-black break-all" >{getKeyValue(post, 'title')}</TableCell>
        <TableCell className="p-2 text-black">{getKeyValue(post, 'publishDate')}</TableCell>
        <TableCell className="p-2 text-black">
          <div className="flex space-x-2">
            <span className="text-lg text-blue-500 cursor-pointer active:opacity-50">
              <EyeIcon onClick={() => handleViewPost(post)} />
            </span>
            <span className="text-lg text-green-500 cursor-pointer active:opacity-50">
              <EditIcon onClick={() => handleEditPost(post)} />
            </span>
            <span className="text-lg text-red-500 cursor-pointer active:opacity-50">
              <DeleteIcon onClick={() => handleDeletePost(post)} />
            </span>
          </div>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
</div>


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


