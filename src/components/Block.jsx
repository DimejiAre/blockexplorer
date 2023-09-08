import { Link } from 'react-router-dom'

export default function Block({blockDetails}) {
  return (
    <div className="block-detail-item">
      <div>Block Number: {blockDetails.number}</div>
      <div>Block Number: {blockDetails.hash}</div>
      <p><Link to={`/block/${blockDetails.number}`}>View Details</Link></p>
    </div>
  );
}
