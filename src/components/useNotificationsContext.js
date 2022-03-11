import { useContext } from "react";
import NotificationContext from "./NotificationsContext";

export default function useNotificationContext() {
  return useContext(NotificationContext);
}
