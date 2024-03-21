import React from 'react';
import QRCode from 'qrcode.react';

const WalletQRCode = ({ address }) => {
 return (
    <div style={{ margin:'100px',background:"white",padding:"8px"}}>
      <h2>Wallet Address</h2>
      <p style={{ color:'black'}}>{address}</p>
      <QRCode value={address} />
    </div>
 );
};


export default WalletQRCode;
