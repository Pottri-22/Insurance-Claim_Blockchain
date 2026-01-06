import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    role: {
      type: String,
      enum: ["admin", "user", "hospital", "insurance_company"],
      required: true,
    },

    // User-specific
    fullName: String,
    phone: String,
    address: String,
    dob: Date,

    // Policy & medical
    policies: [
      {
        policyId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Policy",
        },
        enrolledAt: {
          type: Date,
          default: Date.now,
        },
        externalPolicy: {
          type: Boolean,
          default: false,
        },
        policyNumber: String,
        bondDocument: String,
      },
    ],

    medicalRecords: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Claim",
      },
    ],

    bankDetails: {
      accountNumber: String,
      ifsc: String,
      holderName: String,
    },

    isFirstLogin: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;   // 🔥 THIS LINE FIXES YOUR ERROR
