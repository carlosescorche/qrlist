import React from "react";
import styles from "./QRCode.module.scss";

import { default as QR } from "qrcode.react";

type QRCodeProps = {
  url: string;
};

const QRCode: React.FC<QRCodeProps> = (props) => {
  return (
    <div className={styles.container}>
      <QR
        renderAs="svg"
        value={props.url}
        data-testid="qr"
        width={150}
        height={150}
      />
    </div>
  );
};

export default QRCode;
