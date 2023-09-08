export default function BlockStats({
  blockNumber,
  gasPrice,
  maxFeePerGas,
  maxPriorityFeePerGas,
}) {
  return (
    <div className="block-stats">
      <div className="stat-item">
        <h5>Last Block Number</h5>
        <p>{blockNumber}</p>
      </div>
      <div className="stat-item">
        <h5>Est. Gas Price</h5>
        <p>{gasPrice} Gwei</p>
      </div>
      <div className="stat-item">
        <h5>Est. Max Fee per Gas</h5>
        <p>{maxFeePerGas} Gwei</p>
      </div>
      <div className="stat-item">
        <h5>Est. Max Priority Fee per Gas</h5>
        <p>{maxPriorityFeePerGas} Gwei</p>
      </div>
    </div>
  );
}
