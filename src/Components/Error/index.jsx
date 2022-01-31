import React from "react";

const Error = ({error, handler}) => (
  <div>
    <p>{error}</p>
    <button onClick={handler}>retry request data</button>
  </div>
)

export default Error;
