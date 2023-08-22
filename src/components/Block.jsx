export default function Block({blockDetails}) {
  return (
    <div className="block">
      <div>Block Number: {blockDetails.number}</div>
      <div>Block Number: {blockDetails.hash}</div>
    </div>
  );
}
