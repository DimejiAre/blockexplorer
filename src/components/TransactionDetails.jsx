import { Alchemy, Network, Utils } from "alchemy-sdk";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export default function TransactionDetails() {
  const [transactionDetails, setTransactionDetails] = useState({});
  const params = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    async function getTransactionbyHash() {
      let transaction = await alchemy.core.getTransaction(params.hash);
      transaction = {...transaction,
        value: Utils.formatEther(transaction.value.toString()),
        gasLimit: Utils.formatUnits(transaction.gasLimit.toString(), 'gwei'),
        gasPrice: Utils.formatUnits(transaction.gasPrice.toString(), 'gwei')
      }
      setTransactionDetails(transaction);
    }

    getTransactionbyHash();
  }, [params.hash]);

  const onClickButton = (e) => {
    e.preventDefault()
    navigate("/")
  }

  return (
    <div className="transactionDetails">
      <div className="transactionDetailsHeader">
        <h3>Transaction Details</h3>
        <button onClick={onClickButton}>Back</button>
      </div>
      <div className="transactionDetailsData">
        <table>
          <tr>
            <td>Transaction Hash:</td><td>{transactionDetails.hash}</td>
          </tr>
          <tr>
            <td>Block Number:</td><td>{transactionDetails.blockNumber}</td>
          </tr>
          <tr>
            <td>Block Hash::</td><td>{transactionDetails.blockHash}</td>
          </tr>
          <tr>
            <td>Sender:</td><td>{transactionDetails.from}</td>
          </tr>
          <tr>
            <td>Recipient:</td><td>{transactionDetails.to}</td>
          </tr>
          <tr>
            <td>Value:</td><td>{transactionDetails.value} Ether</td>
          </tr>
          <tr>
            <td>Confirmations:</td><td>{transactionDetails.confirmations}</td>
          </tr>
          <tr>
            <td>Gas Price:</td><td>{transactionDetails.gasPrice} Gwei</td>
          </tr>
          <tr>
            <td>Gas Limit:</td><td>{transactionDetails.gasLimit} Gwei</td>
          </tr>
          <tr>
            <td>Nonce:</td><td>{transactionDetails.nonce}</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
