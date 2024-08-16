import React from "react";
import ReactDOM from "react-dom/client";

const parent = React.createElement(
  "div",
  { id: "parents" },
  React.createElement("div", { id: "child" }, [
    React.createElement("h1", { id: "siblings" }, "Siblings"),
    React.createElement("h2", {}, "sibling2"),
  ])
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent);
