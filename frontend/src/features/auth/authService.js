import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import publicApi from "../../config/axiosPublic";

export const login = async (email, password) => {
  // 1️⃣ Firebase authentication
  const cred = await signInWithEmailAndPassword(auth, email, password);

  // 2️⃣ Get fresh ID token
  const idToken = await cred.user.getIdToken(true);

  // 3️⃣ Backend role sync (NO interceptor here)
  const res = await publicApi.post("/auth/login", { idToken });

  return res.data;
};
