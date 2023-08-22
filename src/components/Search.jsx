import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Search() {
  const [text, setText] = useState('')
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()

    if (!text || text.length < 30 || text.length > 60) {
      alert('Please add a valid address')
      return
    }

    navigate(`/address/${text}`)

    setText('')
  }

  return (
    <form className="search" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Search: </label>
        <input
          type="text"
          style={searchInputStyle}
          placeholder="Search by Address"
            value={text}
            onChange={(e) => setText(e.target.value)}
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
