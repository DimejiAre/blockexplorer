import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/Header';
import Search from './components/Search';
import BlockStats from './components/BlockStats';
import BlockOverview from './components/BlockOverview';
import TransactionDetails from './components/TransactionDetails';
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
    async function getGasPrice() {
      setGasPrice(Utils.formatUnits(await alchemy.core.getGasPrice(), "gwei"));
    }
    getGasPrice();
  }, []);

  useEffect(() => {
    async function getBlocksAndTransactions() {
      const blockNumber = await alchemy.core.getBlockNumber();
      setBlockNumber(await alchemy.core.getBlockNumber());

      const blocks = [];
      for (let i = 0; i < 5; i++) {
        console.log(blockNumber, i , blockNumber - i)
        blocks.push(await alchemy.core.getBlock(parseInt(blockNumber) - i))
      }
      setBlocks(blocks);

      const block = await alchemy.core.getBlockWithTransactions(blockNumber)
      setTransactions(block.transactions.splice(0, 5))
    }

    getBlocksAndTransactions();
  }, []);

  // Todos
  // getting details for individual transactions? //provider.getTransaction( hash )
  // provider.getFeeData( )

  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Search />
                <BlockStats gasPrice={gasPrice} blockNumber={blockNumber} />
                <BlockOverview blocks={blocks} transactions={transactions} />
              </>
            }
          />
          <Route path='/transaction/:hash' element={<TransactionDetails />} />
          <Route path='/block/:number' element={<BlockDetails />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
