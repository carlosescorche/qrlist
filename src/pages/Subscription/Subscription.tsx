import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../consts";
import { useParams } from "react-router-dom";
import Ticket from "../../components/Ticket";
import Loading from "../../components/Loading";
import Alert from "../../components/Alert";

const Subscription: React.FC = () => {
  const params = useParams();
  const id = params["id"];

  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [senal, setSenal] = useState(0);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    (async () => {
      if (id || senal > 0) {
        try {
          const resp = await fetch(`${BACKEND_URL}/subscription/${id}`);
          const json = await resp.json();

          if (resp.ok) {
            const subscription = json.data as Subscription;
            setSubscription(subscription);
            return;
          }

          throw new Error(json.message);
        } catch (err) {
          setError(err);
        }
      }
    })();
  }, [id, senal]);

  useEffect(() => {
    if (subscription?.id) {
      const ws = new WebSocket(
        `${process.env.REACT_APP_WS_URL}/list/${subscription.listId}/observe`
      );

      ws.onerror = (err) => {
        setError(err);
      };

      ws.onmessage = () => {
        setSenal(senal + 1);
      };
    }
  }, [subscription, senal]);

  if (error) {
    return <Alert type="danger" message="Ha ocurrido un error." />;
  }

  if (subscription) {
    const date = new Date(subscription.createdAt).toLocaleString();

    return (
      <Ticket
        number={subscription.number}
        status={subscription.status}
        date={date}
      />
    );
  }

  return <Loading />;
};

export default Subscription;
