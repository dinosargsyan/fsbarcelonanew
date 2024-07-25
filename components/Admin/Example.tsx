"use client";

import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import { db, storage } from "../../app/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

async function addDataToFirestore(
  title: string,
  article: string,
  publishDate: string,
  tags: string,
  uploadedURL: string[]
) {
  try {
    const docRef = await addDoc(collection(db, "news"), {
      title: title,
      article: article,
      publishDate: publishDate,
      tags: [tags],
      imageURL: uploadedURL,
    });
    console.log("Document was written with the id", docRef.id);
    return true;
  } catch (error) {
    console.error("Error is", error);
    return false;
  }
}

interface ExampleProps {
  placeholder?: string;
}

const Example: React.FC<ExampleProps> = ({ placeholder }) => {
  const [title, setTitle] = useState("");
  const [article, setArticle] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [tags, setTags] = useState<string | null>(null);

  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedURL, setUploadedURL] = useState<string[]>([]);

  const editor = useRef(null);
  const [content, setContent] = useState("");
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typing...",
    }),
    [placeholder]
  );

  async function handleSubmit(uploadedURLs: string[]) {
    const added = await addDataToFirestore(
      title,
      content,
      publishDate,
      tags || "",
      uploadedURLs
    );
    if (added) {
      setTitle("");
      setArticle("");
      setPublishDate("");
      setTags(null);
      alert("Data added");
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(event.target.files);
  };

  const handleUpload = async () => {
    if (!files || files.length === 0) return;

    setUploading(true);
    const uploadedURLs: string[] = [];

    try {
      for (const file of Array.from(files)) {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        uploadedURLs.push(url);
        console.log("File Uploaded Successfully", url);
      }
      setUploadedURL(uploadedURLs);
      handleSubmit(uploadedURLs);
    } catch (error) {
      console.error("Error uploading the files", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="pb-[80px] pt-[120px]">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full max-w-2xl">
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="title"
              >
                Title
              </label>
              <textarea
                id="title"
                placeholder="Enter your title"
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                onChange={(e) => setTitle(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="article"
              >
                Article
              </label>
              <div tabIndex={1}>
                <JoditEditor
                  ref={editor}
                  value={article}
                  config={config}
                  onBlur={(newContent) => setContent(newContent)}
                  onChange={() => {}}
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="publishDate"
              >
                Publish Date
              </label>
              <input
                type="date"
                id="publishDate"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label
                className="mb-2 block text-sm font-bold text-gray-700"
                htmlFor="tags"
              >
                Tag
              </label>
              <input
                type="text"
                id="tags"
                value={tags || ""}
                onChange={(e) => setTags(e.target.value)}
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              />
            </div>
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
            </div>
            <button
              onClick={handleUpload}
              className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Example;
