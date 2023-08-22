export default function BlockStats({ blockNumber, gasPrice }) {
  return (
    <div className="blockStats">
      <div className="statItem">Last Block Number: {blockNumber}</div>
      <div className="statItem">Est. Gas Price: {gasPrice} Gwei</div>
    </div>
  );
}
