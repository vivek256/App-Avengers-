import React from "react";
import Document from "./Document";
import "./App.css";

export default function App() {
  return (
    <div
      style={{
        fontFamily: "sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <h2>Assignment</h2>
      <Document />
    </div>
  );
}
