import React, { useEffect, useState } from "react";

import { BACKEND_URL } from "../../consts";
import { useNavigate, useParams } from "react-router-dom";

import Alert from "../../components/Alert";
import Loading from "../../components/Loading";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params["id"];

  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    (async () => {
      if (id) {
        try {
          const resp = await fetch(`${BACKEND_URL}/list/${id}/signup`, {
            method: "post",
          });
          const json = await resp.json();

          if (resp.ok) {
            const subs = json.data as Subscription;
            navigate(`/subscription/${subs.id}`);
            return;
          }

          throw new Error(json.message);
        } catch (err) {
          setError(err);
        }
      }
    })();
  }, [id, navigate]);

  return (
    <div className="loading-page">
      {!error ? (
        <Loading />
      ) : (
        <Alert type="danger" message="Ha ocurrido un error." />
      )}
    </div>
  );
};

export default Signup;
