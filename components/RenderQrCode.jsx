"use client";
import React, { useRef } from "react";
import QRCode from "react-qr-code";

const RenderQrCode = ({ url, className }) => {
  const qrCodeRef = useRef();
  return (
    <QRCode
      ref={qrCodeRef}
      size={50}
      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
      value={url}
      viewBox={`0 0 100 100`}
      className={className}
    />
  );
};

export default RenderQrCode;
