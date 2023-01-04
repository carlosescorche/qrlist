import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../../consts";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import Alert from "../../components/Alert";

const Home: React.FC = () => {
  const [error, setError] = useState<unknown>(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const resp = await fetch(`${BACKEND_URL}/list`, {
        method: "post",
        body: JSON.stringify({
          name: "Lista",
          description: "Lista de prueba",
          code: "A",
        }),
      });

      const json = await resp.json();

      if (resp.ok) {
        const list = json.data as List;
        navigate(`/list/${list.id}`);
        return;
      }

      setError(json.message);
    })();
  }, [navigate]);

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

export default Home;
