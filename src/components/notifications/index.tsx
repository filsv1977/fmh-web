import { useEffect, useState } from "react";
import { notification } from "../../shared/notifications";
import styles from "./styles.module.less";
import { NOTIFICATION_ADD } from "../../shared/contants";

type Notification = {
  id: number;
  label: string;
  text: string;
};

let id = 0;

export const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const callback = (e: Event) => {
      const { detail } = e as CustomEvent;
      setNotifications((c) => [
        ...c,
        {
          id: id++,
          label: detail.label,
          text: detail.text,
        },
      ]);
      console.log("Instance fired.", e);
    };
    notification.addEventListener(NOTIFICATION_ADD, callback);
    return () => {
      notification.removeEventListener(NOTIFICATION_ADD, callback);
    };
  }, []);
  return (
    notifications.length > 0 && (
      <div className={styles.notifications}>
        {notifications.map((notification: Notification) => {
          // TODO close by timeout
          return (
            <div key={notification.id}>
              <div>{notification.label}</div>
              <div>{notification.text}</div>
              <button
                type="button"
                onClick={() =>
                  setNotifications((c) =>
                    c.filter((n) => n.id !== notification.id)
                  )
                }
              >
                close
              </button>
            </div>
          );
        })}
      </div>
    )
  );
};
