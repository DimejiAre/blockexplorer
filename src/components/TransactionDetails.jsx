import { Alchemy, Network, Utils } from "alchemy-sdk";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export default function TransactionDetails() {
  const [transactionDetails, setTransactionDetails] = useState({});
  const params = useParams();

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

  return (
    <div className="transactionDetails">
      <div>Transaction Hash: {transactionDetails.hash}</div>
      <div>Block Number: {transactionDetails.blockNumber}</div>
      <div>Block Hash: {transactionDetails.blockHash}</div>
      <div>Sender: {transactionDetails.from}</div>
      <div>Recipient: {transactionDetails.to}</div>
      <div>Value: {transactionDetails.value} Ether</div>
      <div>Confirmations: {transactionDetails.confirmations}</div>
      <div>Gas Price: {transactionDetails.gasLimit} Gwei</div>
      <div>Gas Limit: {transactionDetails.gasPrice} Gwei</div>
      <div>Nonce: {transactionDetails.nonce}</div>
    </div>
  );
}
