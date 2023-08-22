import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import BlockStats from './components/BlockStats';
import BlockDetails from './components/BlockDetails';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [gasPrice, setGasPrice] = useState();
  const [blocks, setBlocks] = useState([])
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    async function getGasPrice() {
      setGasPrice(Utils.formatUnits(await alchemy.core.getGasPrice(), "gwei"));
    }

    getBlockNumber();
    getGasPrice();
  });

  useEffect(() => {
    async function getBlocks() {
      const blockNumbers = [];
      for (let i = 0; i < 5; i++) {
        blockNumbers.push(await alchemy.core.getBlock(blockNumber - i))
      }
      setBlocks(blockNumbers);
    }

    async function getTransactions() {
      const block = await alchemy.core.getBlockWithTransactions(blockNumber)
      setTransactions(block.transactions.splice(0, 5))
    }

    getBlocks();
    getTransactions();
  }, [blockNumber]);

  // Todos
  // getting details for individual transactions? //provider.getTransaction( hash )
  // provider.getFeeData( )

  return (
    <div className="container">
      <Header />
      <Search />
      <BlockStats gasPrice={gasPrice} blockNumber={blockNumber} />
      <BlockDetails blocks={blocks} transactions={transactions} />
    </div>
  )
}

export default App;
