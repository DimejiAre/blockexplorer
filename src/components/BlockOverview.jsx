import Transactions from "./Transactions";
import Blocks from "./Blocks";

export default function BlockOverview({ blocks, transactions }) {
  return (
    <div className="blockOverview">
      <Blocks blocks={blocks} />
      <Transactions transactions={transactions} />
    </div>
  );
}
