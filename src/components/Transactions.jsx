import Transaction from "./Transaction";

export default function Transactions({ transactions }) {
  return (
    <div className="blockDetail">
      <div className="block-detail-header"><h3>Latest Transactions</h3></div>
      <div>
        {transactions.map((transaction) => (
          <Transaction key={transaction.hash} transactionDetails={transaction} />
        ))}
      </div>
    </div>
  );
}
