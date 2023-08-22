import Transactions from "./Transactions";
import Blocks from "./Blocks";

export default function BlockDetails({ blocks, transactions }) {
  return (
    <div className="blockDetails">
      <Blocks blocks={blocks} />
      <Transactions transactions={transactions} />
    </div>
  );
}
