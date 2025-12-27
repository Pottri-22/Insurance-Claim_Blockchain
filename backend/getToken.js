import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// 🔴 USE YOUR WEB APP CONFIG FROM FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyBrkcNbe5A16JRlNV1RRkZhwkHTPs1vQxE",
  authDomain: "insurance-claim-blockchain.firebaseapp.com",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function getToken() {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    "testuser@gmail.com",
    "test1234"
  );

  const token = await userCredential.user.getIdToken();
  console.log("Firebase ID Token:\n", token);
}

getToken();
