import { FileInput, Button } from "flowbite-react";
import { HiUpload } from "react-icons/hi";

function CreatePost() {
  return (
    <>
    <div className=" bg-sky-200 w-full">
        <div className="max-w-3xl mx-auto min-h-screen p-6 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-10  pb-2 mt-15">
          Create a Post
        </h1>

        <div className="w-full bg-white shadow-xl rounded-3xl p-8 border border-gray-100 hover:shadow-2xl transition duration-300">
          <form className="flex flex-col gap-6">
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
                className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                placeholder="Enter your post title"
                id="title"
                required
              />
            </div>

            {/* Image Upload */}
            <div className="border-2 border-dashed border-blue-300 bg-blue-50 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 hover:border-blue-500 transition">
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                <FileInput
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="w-full sm:w-auto"
                />
                <p className="text-gray-600 text-sm italic">
                  Supported formats: JPG, PNG, JPEG
                </p>
              </div>
              <Button
                type="button"
                gradientDuoTone="cyanToBlue"
                outline
                pill
                size="sm"
                className="flex items-center gap-2 p-6"
              >
                <HiUpload className="w-5 h-5" />
                Upload Image
              </Button>
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

