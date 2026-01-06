import { useState } from "react";
import axios from "../../config/axios";
import { useNavigate } from "react-router-dom";

const CompleteProfile = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    dob: "",
    bankDetails: {
      accountNumber: "",
      ifsc: "",
      holderName: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("bank.")) {
      setForm({
        ...form,
        bankDetails: {
          ...form.bankDetails,
          [name.split(".")[1]]: value,
        },
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.put("/users/profile", form);

    navigate("/patient");
  };

  return (
    <div>
      <h2>Complete Your Profile</h2>

      <form onSubmit={handleSubmit}>
        <input name="fullName" placeholder="Full Name" onChange={handleChange} />
        <input name="phone" placeholder="Phone" onChange={handleChange} />
        <input name="address" placeholder="Address" onChange={handleChange} />
        <input type="date" name="dob" onChange={handleChange} />

        <h4>Bank Details</h4>
        <input
          name="bank.accountNumber"
          placeholder="Account Number"
          onChange={handleChange}
        />
        <input
          name="bank.ifsc"
          placeholder="IFSC"
          onChange={handleChange}
        />
        <input
          name="bank.holderName"
          placeholder="Account Holder Name"
          onChange={handleChange}
        />

        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default CompleteProfile;
