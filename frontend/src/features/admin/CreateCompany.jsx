import { useState } from "react";
import api from "../../config/axiosPublic";

export default function CreateCompany({ onCreated }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [walletAddress, setWallet] = useState("");

  const submit = async () => {
    try {
      await api.post("/insurance-companies/register", {
        name, email, walletAddress
      });
      alert("Company created");
      setName(""); setEmail(""); setWallet("");
      onCreated();
    } catch (err) {
      alert(err.response?.data?.message || "Creation failed");
    }
  };

  return (
    <div style={box}>
      <h3>Create Insurance Company</h3>
      <input style={inp} placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input style={inp} placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input style={inp} placeholder="Wallet" value={walletAddress} onChange={e => setWallet(e.target.value)} />
      <button style={btn} onClick={submit}>Create</button>
    </div>
  );
}

const box = { background:"#fff", padding:20, borderRadius:6, marginBottom:30 };
const inp = { width:"100%", padding:10, marginBottom:15 };
const btn = { padding:"10px 16px", background:"#1e3c72", color:"#fff", border:"none" };
