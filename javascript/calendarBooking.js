/*import React from "react";*/
//import { createRoot } from "../node_modules/react-dom/client";
var m = require("react-dom");

function Title() {
  // TODO: Actually implement a navigation bar
  return React.createElement("button", { className: "btn" }, "booking lesson");
}
debugger;

let element = document.querySelector("#booking");
console.log("element: " + element);
const root = m.createRoot(element);
root.render(Title);
