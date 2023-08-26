import { Alchemy, Network, Utils } from "alchemy-sdk";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Transactions from "./Transactions";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export default function BlockDetails() {
  const [blockDetails, setBlockDetails] = useState({});
  const [blockTransactions, setBlockTransactions] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getBlock() {
      let block = await alchemy.core.getBlockWithTransactions(parseInt(params.number));
      block = {...block,
        gasUsed: Utils.formatUnits(block.gasUsed.toString(), 'gwei'),
        gasLimit: Utils.formatUnits(block.gasLimit.toString(), 'gwei')
      }
      setBlockDetails(block);
      setBlockTransactions(block.transactions.splice(0,5))
    }

    getBlock();
  }, [params.number]);

  const onClickButton = (e) => {
    e.preventDefault()
    navigate("/")
  }

  return (
    <div className="details">
      <div className="detailsHeader">
        <h3>Block Details</h3>
        <button onClick={onClickButton}>Back</button>
      </div>
      <div className="detailsData">
        <table>
          <tr>
            <td>Hash:</td><td>{blockDetails.hash}</td>
          </tr>
          <tr>
            <td>Number:</td><td>{blockDetails.number}</td>
          </tr>
          <tr>
            <td>difficulty:</td><td>{blockDetails.difficulty}</td>
          </tr>
          <tr>
            <td>timestamp:</td><td>{blockDetails.timestamp} Ether</td>
          </tr>
          <tr>
            <td>miner:</td><td>{blockDetails.miner}</td>
          </tr>
          <tr>
            <td>Gas Price:</td><td>{blockDetails.gasPrice} Gwei</td>
          </tr>
          <tr>
            <td>Gas Used:</td><td>{blockDetails.gasUsed} Gwei</td>
          </tr>
          <tr>
            <td>Nonce:</td><td>{blockDetails.nonce}</td>
          </tr>
        </table>
      </div>
      <Transactions transactions={blockTransactions}/>
    </div>
  );
}
