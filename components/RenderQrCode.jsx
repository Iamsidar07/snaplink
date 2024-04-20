"use client";
import React, { useRef, useState } from "react";
import QRCode from "react-qr-code";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

const RenderQrCode = ({ url, className, isCustom }) => {
  const [fgColor, setFgColor] = useState("black");
  const [bgColor, setBgColor] = useState("white");
  const qrCodeRef = useRef();

  //TODO: complete this function
  const downloadQRCode = () => {};
  return (
    <div className="">
      <div className="w-full flex-1">
        <QRCode
          ref={qrCodeRef}
          size={50}
          fgColor={fgColor}
          bgColor={bgColor}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={url}
          viewBox={`0 0 100 100`}
          className={className}
        />
      </div>
      {isCustom ? (
        <div className="mt-4 flex gap-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Label
                className="w-12 h-12 rounded-xl p-2 border cursor-pointer"
                htmlFor="fgColor"
              >
                <div
                  style={{ background: fgColor }}
                  className="w-full h-full rounded-lg"
                />
              </Label>
              <Input
                id="fgColor"
                type="color"
                value={fgColor}
                onChange={(v) => setFgColor(v.target.value)}
                className="w-16 h-16 rounded-xl p-2 hidden"
              />{" "}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Label
              className="w-12 h-12 rounded-xl p-2 border cursor-pointer"
              htmlFor="bgColor"
            >
              <div
                style={{ background: bgColor }}
                className="w-full h-full rounded-lg"
              />
            </Label>
            <Input
              id="bgColor"
              type="color"
              value={bgColor}
              onChange={(v) => setBgColor(v.target.value)}
              className="w-16 h-16 rounded-xl p-2 hidden"
            />{" "}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default RenderQrCode;
