export default function Transaction({transactionDetails}) {
  return (
    <div className="transaction">
      <div>Transaction Hash: {transactionDetails.hash}</div>
      <div>Block Number: {transactionDetails.blockNumber}</div>
    </div>
  );
}
