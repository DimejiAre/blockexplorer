import { Alchemy, Network, Utils} from "alchemy-sdk";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export default function AccountDetails() {
  const [balance, setBalance] = useState(0);
  const params = useParams();

  useEffect(() => {
    async function getBalance() {
      let balance = await alchemy.core.getBalance(params.address);
      setBalance(Utils.formatEther(balance));
    }

    getBalance();
  }, [params.address]);

  return (
    <div className="accountDetails">
      <div>Account: {params.address}</div>
      <div>Balance: {balance} ETH</div>
    </div>
  );
}
