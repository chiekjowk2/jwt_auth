import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: function () {
        return !this.oauthProvider;
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.oauthProvider;
      },
    },
    oauthProvider: {
      type: String,
    },
    oauthId: {
      type: String,
      required: function () {
        return !!this.oauthProvider;
      },
    },
    tokenVersion: { type: Number, default: 0 },
  },

  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
