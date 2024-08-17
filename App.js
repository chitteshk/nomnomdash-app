import React from "react";
import ReactDOM from "react-dom/client";

const Title = () => {
  return <h2>title</h2>;
};

const Heading = () => {
  return (
    <div id="container">
      <Title />
      <h1>Namaste JS 🚀</h1>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Heading />);
