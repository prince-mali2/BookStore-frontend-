import React from "react";
import StarIcon from "@mui/icons-material/Star";

export default function Rating() {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "green",
        width: "3em",
        padding: ".5%",
      }}
    >
      <div
        style={{
          fontSize: ".9em",
          width: "3em",
          color: "white",
        }}
      >
        4.5
      </div>
      <StarIcon sx={{ color: "white", height: ".7em" }} />
    </div>
  );
}
