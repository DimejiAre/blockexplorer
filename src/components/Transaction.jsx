import React from "react";

export default function Transaction({transactionDetails}) {
  return (
    <>
      <div className="Transaction">Transaction Hash: {transactionDetails.hash}</div>
      <div className="Transaction">Block Number: {transactionDetails.blockNumber}</div>
    </>
  );
}
