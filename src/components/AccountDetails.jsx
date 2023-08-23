import { Alchemy, Network, Utils} from "alchemy-sdk";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export default function AccountDetails() {
  const [balance, setBalance] = useState(0);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getBalance() {
      let balance = await alchemy.core.getBalance(params.address);
      setBalance(Utils.formatEther(balance));
    }

    getBalance();
  }, [params.address]);

  const onClickButton = (e) => {
    e.preventDefault()
    navigate("/")
  }

  return (
    <div className="details">
      <div className="detailsHeader">
        <h3>Account Details</h3>
        <button onClick={onClickButton}>Back</button>
      </div>
      <div className="detailsData">
        <table>
          <tr>
            <td>Account:</td><td>{params.address}</td>
          </tr>
          <tr>
            <td>Balance:</td><td>{balance} ETH</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
