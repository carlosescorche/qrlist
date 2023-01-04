import React from "react";
import styles from "./Ticket.module.scss";

type TicketProps = {
  number: string;
  status: string;
  date: string;
};

const Ticket: React.FC<TicketProps> = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.number}>
        <h1>{props.number}</h1>
      </div>

      <div className={styles.status}>
        En estado <span className={styles[props.status]}>{props.status}</span>
      </div>
      <div className={styles.date}>{props.date}</div>
    </div>
  );
};

export default Ticket;
