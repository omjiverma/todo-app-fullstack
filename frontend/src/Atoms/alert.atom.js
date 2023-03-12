import { atom } from "recoil";

const alertState = atom({
  key: "alertState",
  default: {
    message: "",
    type: "",
    show: false,
  },
});

export default alertState