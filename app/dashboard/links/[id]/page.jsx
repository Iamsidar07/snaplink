import React from "react";

const page = ({ params }) => {
  const { id } = params;
  return <div>{id}</div>;
};

export default page;
