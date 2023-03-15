import { atom } from "recoil";

// Load User Data From Local Storage if Exist
const userId = localStorage.getItem("userId");
const user = localStorage.getItem("user");
const email = localStorage.getItem("email");

const userState = atom({
  key: "userState",
  default: {
    userId: userId || "",
    user: user || "",
    email: email || "",
  },
});

export default userState;
