import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import api from "../../config/axios";

export const login = async (email, password) => {
  // 1️⃣ Firebase authentication
  const cred = await signInWithEmailAndPassword(auth, email, password);

  // 2️⃣ Get Firebase ID token
  const idToken = await cred.user.getIdToken();

  // 3️⃣ Send token in BODY (same as Postman)
  const res = await api.post("/auth/login", {
    idToken,
  });

  return res.data; // { message, user }
};
