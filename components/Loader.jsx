import { Loader } from "lucide-react";
import React from "react";

const MyLoader = () => {
  return (
    <div className="mx-auto">
      <Loader className="w-6 h-6 animate-spin" />
    </div>
  );
};

export default MyLoader;
