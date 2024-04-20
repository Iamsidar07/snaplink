import Image from "next/image";
import React from "react";

const DownArrow = () => {
  return (
    <Image
      src={"/down-arrow.png"}
      alt="down-arrow"
      width={368}
      height={699}
      className="mx-auto h-44 sm:h-96 object-contain pointer-events-none"
    />
  );
};

export default DownArrow;
