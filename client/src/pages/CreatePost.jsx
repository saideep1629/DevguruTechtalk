import { FileInput, Button } from "flowbite-react";
import { useState } from "react";
import { HiUpload } from "react-icons/hi";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase.js";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function CreatePost() {
  // const [file, setFile] = useState(null);
  // const [imageUploadProgress, setImageUploadProgress] = useState(null);
  // const [imageUploadError, setImageUploadError] = useState(null);
  // const [formData, setFormData] = useState({});

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postImage, setPostImage] = useState(null);

  const handleForm = async (e) => {
    try {
      e.preventDefault();

      let data = new FormData();

      data.append("title", title);
      data.append("content", content);
      data.append("postImage", postImage);

      if (!title || !content) {
        alert("title or content required");
        return;
      }

      const res = await fetch("/api/post/create-post", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        console.log("error while getting response");
        return;
      }

      const result = await res.json();
      alert("Blog created Successfully!");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Blog creation process Failed !!");
    }
  };

  // const handleUploadImage = async () => {
  //   try {
  //     if (!file) {
  //       console.log("file", file);

  //       setImageUploadError("Please select a file to upload.");
  //       return;
  //     }

  //     setImageUploadError(null);

  //     const storage = getStorage(app);
  //     console.log("storage", storage);

  //     const fileName = new Date().getTime() + "-" + file.name;
  //     const storageRef = ref(storage, fileName);

  //     const uploadTask = uploadBytesResumable(storageRef, file);

  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         const progress =
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         setImageUploadProgress(progress.toFixed(0));
  //         console.log("Upload is " + progress + "% done");
  //       },
  //       (error) => {
  //         setImageUploadError("Error uploading file: " + error.message);
  //         setImageUploadProgress(null);
  //       },
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //           console.log("File available at", downloadURL);
  //           setImageUploadProgress(null);
  //           setImageUploadError(null);
  //           setFormData({ ...formData, image: downloadURL });
  //         });
  //       }
  //     );
  //   } catch (error) {
  //     setImageUploadError("Error uploading file: " + error.message);
  //     setImageUploadProgress(null);
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <div className=" bg-sky-200 w-full">
        <div className="max-w-3xl mx-auto min-h-screen p-6 flex flex-col items-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-10  pb-2 mt-15">
            Create a Post
          </h1>

          <div className="w-full bg-white shadow-xl rounded-3xl p-8 border border-gray-100 hover:shadow-2xl transition duration-300">
            <form className="flex flex-col gap-6" onSubmit={handleForm}>
              {/* Title Input */}
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-lg font-semibold text-gray-700"
                >
                  Post Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                  placeholder="Enter your post title"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              {/* Image Upload */}
              <div className="border-2 border-dashed border-blue-300 bg-blue-50 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 hover:border-blue-500 transition">
                <input
                  type="file"
                  name="postImage"
                  accept="image/*"
                  onChange={(e) => setPostImage(e.target.files[0])}
                  className="w-full border rounded p-2 sm:p-3 md:p-4 text-sm sm:text-base  lg:text-xl"
                  required
                />
              </div>

              {/* Textarea for Content */}
              <div>
                <label
                  htmlFor="content"
                  className="block mb-2 text-lg font-semibold text-gray-700"
                >
                  Blog Content
                </label>
                <textarea
                  id="content"
                  rows="6"
                  className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                  placeholder="Write your post content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full"
                >
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
