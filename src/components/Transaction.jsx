import {Link} from 'react-router-dom'

export default function Transaction({transactionDetails}) {
  // const onClick = (e) =>{
  //   e.preventDefault()
  //   alert("Clicked!")
  // }

  return (
    <div className="transaction" /*onClick={onClick}*/>
      <div>Transaction Hash: {transactionDetails.hash}</div>
      <div>Block Number: {transactionDetails.blockNumber}</div>
      <p><Link to={`/transaction/${transactionDetails.hash}`}>View Details</Link></p>
    </div>
  );
}
