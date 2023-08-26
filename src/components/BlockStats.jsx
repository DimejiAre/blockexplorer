export default function BlockStats({ blockNumber, gasPrice, maxFeePerGas, maxPriorityFeePerGas }) {
  return (
    <div className="blockStats">
      <div className="statItem">
        <h5>Last Block Number:</h5>
        <p>{blockNumber}</p>
      </div>
      <div className="statItem">
        <h5>Est. Gas Price</h5>
        <p>{gasPrice} Gwei</p>
      </div>
      <div className="statItem">
        <h5>Est. Max Fee per Gas</h5>
        <p>{maxFeePerGas} Gwei</p>
      </div>
      <div className="statItem">
        <h5>Est. Max Priority Fee per Gas</h5>
        <p>{maxPriorityFeePerGas} Gwei</p>
      </div>
    </div>
  );
}
