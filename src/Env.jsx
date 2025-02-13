import React from "react";

const Env = () => {
  let apiKey = import.meta.env.VITE_API_KEY;
  console.log(import.meta.env.VITE_API_KEY);
  console.log(apiKey);

  return <div>Env</div>;
};

export default Env;
