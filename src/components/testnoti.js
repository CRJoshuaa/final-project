import { toast } from "react-toastify";

const checkedCheck = (channelName, newMessage) => {
  console.log("NOTIFICATION");
  console.log(newMessage);
  toast.info("Message from " + channelName + " : " + newMessage, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  //   if (checked === false) {
  //     console.log(newMessage);
  //     toast.info(newMessage, {
  //       position: "top-center",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //   } else {
  //     return;
  //   }
};

export { checkedCheck };
