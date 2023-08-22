import Transaction from "./Transaction";

export default function Transactions({ transactions }) {
  return (
    <div className="blockDetail">
      <h3>Latest Transactions</h3>
      <div>
        {transactions.map((transaction) => (
          <Transaction key={transaction.hash} transactionDetails={transaction} />
        ))}
      </div>
    </div>
  );
}
