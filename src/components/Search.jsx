export default function Search() {
  return (
    <form className="search">
      <div className="form-control">
        <label>Search: </label>
        <input
          type="text"
          style={searchInputStyle}
          placeholder="Search by Address"
          //   value={text}
          //   onChange={(e) => setText(e.target.value)}
        />
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
