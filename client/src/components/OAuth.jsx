import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../features/userSlice.js"


const OAuth = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });

      const resultFromGoogle = await signInWithPopup(auth, provider);
      // console.log(resultFromGoogle);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          photoURL: resultFromGoogle.user.photoURL,
        }),
      });

      const data = await res.json();
      console.log("data", data);
      
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div>
      <Button
        type="button"
        className="w-full"
        outline
        onClick={handleGoogleClick}
      >
        <AiFillGoogleCircle className="w-6 h-6 mr-2" /> Sign in with Google
      </Button>
    </div>
  );
};

export default OAuth;
