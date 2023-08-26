import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Search({latestBlockNumber}) {
  const [text, setText] = useState('')
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()
    if (text.length < 40 && parseInt(text) <= latestBlockNumber){
      navigate(`/block/${text}`)
    } else if(text.length === 42){
      navigate(`/address/${text}`)
    } else if (text.length === 66){
      navigate(`/transaction/${text}`)
    }
    else{
      alert('Please add a valid input')
      return
    }

    setText('')
  }

  return (
    <form className="search" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Search: </label>
        <input
          type="text"
          style={searchInputStyle}
          placeholder="Search by Address / Txn Hash / Block Number"
            value={text}
            onChange={(e) => setText(e.target.value.trim())}
        />
      <input type='submit' value='Search'/>
      </div>
    </form>
  );
}

const searchInputStyle = {
  height: "40px",
  width: "50%",
  borderRadius: "10px",
  padding: "5px"
};
