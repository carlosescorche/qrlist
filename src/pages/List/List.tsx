import React, { useEffect, useState } from "react";

import { BACKEND_URL } from "../../consts";
import { useParams } from "react-router-dom";

import SubsList from "../../components/List";
import Alert from "../../components/Alert";
import QRCode from "../../components/QRCode";

const List: React.FC = () => {
  const params = useParams();
  const id = params["id"];

  const [list, setList] = useState<List | null>(null);
  const [subs, setSubs] = useState<Subscription[] | null>(null);
  const [senal, setSenal] = useState(0);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(`${BACKEND_URL}/list/${id}`);
        const json = await resp.json();

        if (resp.ok) {
          const list = json.data as List;
          setList(list);
          return;
        }

        throw new Error(json.message);
      } catch (err) {
        setError(err);
      }
    })();
  }, [id]);

  useEffect(() => {
    (async () => {
      if (list?.id || senal > 0) {
        try {
          const url = `${BACKEND_URL}/list/${list?.id}/subscriptions`;
          const resp = await fetch(url);
          const json = await resp.json();

          if (resp.ok) {
            const subs = json.data as Subscription[];
            setSubs(subs);
            return;
          }

          throw new Error(json.message);
        } catch (err) {
          setError(err);
        }
      }
    })();
  }, [list, senal]);

  useEffect(() => {
    if (list?.id) {
      const url = `${process.env.REACT_APP_WS_URL}/list/${list.id}/observe`;
      const ws = new WebSocket(url);

      ws.onerror = (err) => {
        setError(err);
      };

      ws.onmessage = () => {
        setSenal(senal + 1);
      };
    }
  }, [list, senal]);

  const updateSubscription = async (id: string) => {
    const status = "ACCEPTED";

    try {
      if (subs) {
        setSubs(
          subs.map((s) => {
            if (s.id === id) s.status = status;
            return s;
          })
        );
      }

      await fetch(`${BACKEND_URL}/subscription/${id}`, {
        method: "post",
        body: JSON.stringify({ status }),
      });
    } catch (err) {
      setError(err);
    }
  };

  if (error) {
    return (
      <div className="flex-center">
        <Alert type="danger" message="Ha ocurrido un error." />
      </div>
    );
  }

  if (list?.id) {
    const url = `${process.env.REACT_APP_URL}/list/${list.id}/signup`;

    return (
      <div className="list-page">
        <QRCode url={url} />

        <div className="alert">
          <Alert type="info" message="Escanea el código QR con un smartphone" />
        </div>

        <SubsList items={subs} onClick={updateSubscription} />
      </div>
    );
  }

  return null;
};

export default List;
