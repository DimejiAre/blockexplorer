import { Alchemy, Network, Utils } from "alchemy-sdk";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export default function BlockDetails() {
  const [blockDetails, setBlockDetails] = useState({});
  const params = useParams();

  useEffect(() => {
    async function getBlock() {
      let block = await alchemy.core.getBlock(parseInt(params.number));
      console.log(block)
      block = {...block,
        gasUsed: Utils.formatUnits(block.gasUsed.toString(), 'gwei'),
        gasLimit: Utils.formatUnits(block.gasLimit.toString(), 'gwei')
      }
      setBlockDetails(block);
    }

    getBlock();
  }, [params.number]);

  return (
    <div className="blockDetails">
      <div>Hash: {blockDetails.hash}</div>
      <div>Number: {blockDetails.number}</div>
      <div>Block Hash: {blockDetails.blockHash}</div>
      <div>difficulty: {blockDetails.difficulty}</div>
      <div>timestamp: {blockDetails.timestamp}</div>
      <div>miner: {blockDetails.miner}</div>
      <div>Gas Used: {blockDetails.gasUsed} Gwei</div>
      <div>Gas Limit: {blockDetails.gasPrice} Gwei</div>
      <div>Nonce: {blockDetails.nonce}</div>
    </div>
  );
}
