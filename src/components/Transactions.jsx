import Transaction from "./Transaction";

export default function Transactions({ transactions }) {
  return (
    <div className="blockDetail">
      <h3>Latest Transactions</h3>
      <div>
        {transactions.map((transaction) => (
          <Transaction transactionDetails={transaction} />
        ))}
      </div>
    </div>
  );
}
