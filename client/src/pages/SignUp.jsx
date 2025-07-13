const SignUp = () => {
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-gray-50 p-8 rounded-xl shadow-lg w-full max-w-md">
          <form className="flex flex-col gap-4">
            <div>
              <label
                for="username"
                className="block text-sm/6 font-medium text-gray-900 mb-1"
              >
                Username
              </label>
              <input
                type="text"
                className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                placeholder="username"
                id="username"
                required
              />
            </div>

            <div>
              <label
                for="gmail"
                className="block text-sm/6 font-medium text-gray-900 mb-1"
              >
                Email
              </label>
              <input
                type="gmail"
                className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                placeholder="joe@gmail.com"
                id="email"
                required
              />
            </div>

            <div>
              <label
                for="password"
                className="block text-sm/6 font-medium text-gray-900 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                className="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                placeholder="password"
                id="password"
              />
            </div>
            <div>
              <button
                type="button"
                class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
