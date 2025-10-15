import { Alert } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import OAuth from "../components/OAuth.jsx";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      // console.log(data);

      if (!res.ok || data.success === false) {
        setErrorMessage(data.message || "something went wrong");
        setLoading(false);
        return;
      }

      setLoading(false);
      navigate("/sign-in");
    } catch (error) {
      // console.log("error", error.message);
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-sky-200">
        <div className="p-8 rounded-xl shadow-lg w-full max-w-md bg-gray-200">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900 mb-1"
              >
                Username
              </label>
              <input
                type="text"
                className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                placeholder="username"
                id="username"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="gmail"
                className="block text-sm/6 font-medium text-gray-900 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                placeholder="joe@gmail.com"
                id="email"
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                placeholder="password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <div>
              <button
                type="submit"
                className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full"
                disabled={loading}
              >
                {loading ? "Loading..." : "Sign Up"}
              </button>
              <OAuth />
            </div>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>

          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </>
  );
};

export default SignUp;
