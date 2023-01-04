import React from "react";
import styles from "./List.module.scss";

type ListProps = {
  items: Subscription[] | null;
  onClick: (id: string) => void;
};

const List: React.FC<ListProps> = ({ items, onClick }) => {
  return (
    <div className={`${styles["list__container"]}`}>
      <table>
        <thead>
          <tr>
            <th>Número</th>
            <th>Estado</th>
            <th>Atención</th>
          </tr>
        </thead>
        {items && (
          <tbody>
            {items.map((i) => (
              <tr key={i.id}>
                <td>{i.number}</td>
                <td>{i.status}</td>
                <td>
                  <button onClick={() => onClick(i.id)}>Aceptar</button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default List;
