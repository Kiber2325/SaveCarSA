import React, { useState } from 'react';
import QRCode from 'qrcode-generator';

//import { ref,set , getDatabase,push } from "firebase/database";
//import {  app, database } from '../../conexion/firebase';
function QrCodigo (props){
    const [data, setData] = useState(props.datos);

  const handleChange = (event) => {
    setData(event.target.value);
  };

  const generateQRCode = () => {
    const qr = QRCode(0, 'L');
    qr.addData(data);
    qr.make();
    const qrCodeData = qr.createDataURL();
    return qrCodeData;
  };
  return (
    <div>
      {false&&<input type="text" value={data} onChange={handleChange} />}
      {props.datos && <img src={generateQRCode()} alt="QR Code" />}
    </div>
  );
}

export default QrCodigo;
