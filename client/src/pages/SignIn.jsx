import { Alert } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../features/userSlice.js";
import { useDispatch, useSelector } from "react-redux";

function Signin() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        dispatch(signInFailure(data.message || "something went wrong"));
        return;
      }

      dispatch(signInSuccess(data?.data));
      navigate("/home");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-sky-200">
        <div className="p-8 rounded-xl shadow-lg w-full max-w-md bg-gray-200">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
                {loading ? "Loading..." : "Sign In"}
              </button>
            </div>
          </form>

          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </>
  );
}

export default Signin;
