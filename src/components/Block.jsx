import React from "react";

export default function Block({blockDetails}) {
  return (
    <>
      <div className="Block">Block Number: {blockDetails.number}</div>
      <div className="Block">Block Number: {blockDetails.hash}</div>
    </>
  );
}
