import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBrkcNbe5A16JRlNV1RRkZhwkHTPs1vQxE",
  authDomain: "insurance-claim-blockchain.firebaseapp.com",
  projectId: "insurance-claim-blockchain",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);