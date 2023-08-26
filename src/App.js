import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/Header';
import Search from './components/Search';
import BlockStats from './components/BlockStats';
import BlockOverview from './components/BlockOverview';
import TransactionDetails from './components/TransactionDetails';
import BlockDetails from './components/BlockDetails';
import AccountDetails from './components/AccountDetails';
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
  const [maxFeePerGas, setMaxFeePerGas] = useState();
  const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = useState();
  const [blocks, setBlocks] = useState([])
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    async function getFeeData() {
      let { gasPrice, maxFeePerGas, maxPriorityFeePerGas } = await alchemy.core.getFeeData()
      gasPrice = Utils.formatUnits(gasPrice, "gwei")
      maxFeePerGas = Utils.formatUnits(maxFeePerGas, "gwei")
      maxPriorityFeePerGas = Utils.formatUnits(maxPriorityFeePerGas, "gwei")
      setGasPrice(gasPrice);
      setMaxFeePerGas(maxFeePerGas);
      setMaxPriorityFeePerGas(maxPriorityFeePerGas)
    }

    getFeeData();
  }, []);

  useEffect(() => {
    async function getBlocksAndTransactions() {
      const blockNumber = await alchemy.core.getBlockNumber();
      setBlockNumber(await alchemy.core.getBlockNumber());

      const blocks = [];
      for (let i = 0; i < 5; i++) {
        blocks.push(await alchemy.core.getBlock(parseInt(blockNumber) - i))
      }
      setBlocks(blocks);

      const block = await alchemy.core.getBlockWithTransactions(blockNumber)
      setTransactions(block.transactions.splice(0, 5))
    }

    getBlocksAndTransactions();
  }, []);

  // Todos
  // styling (make responsive)
  // make addresses/hashes clickable

  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Search latestBlockNumber={blockNumber}/>
                <BlockStats gasPrice={gasPrice} blockNumber={blockNumber} maxFeePerGas={maxFeePerGas} maxPriorityFeePerGas={maxPriorityFeePerGas}  />
                <BlockOverview blocks={blocks} transactions={transactions} />
              </>
            }
          />
          <Route path='/transaction/:hash' element={<TransactionDetails />} />
          <Route path='/block/:number' element={<BlockDetails />} />
          <Route path='/address/:address' element={<AccountDetails />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
