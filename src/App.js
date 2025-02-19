import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(true);

  const fetchData = async () => {
    if (input != "") {
      const data = await fetch("https://dummyjson.com/recipes/search?q=" + input)
      const json = await data.json();
      setResults(json.recipes)
    }
  }
  useEffect(()=>{
    fetchData();
  },[input])
  return (
    <div className="App">
      <h3>Auto Completion Search Bar</h3>
      <input
        type='text'
        className="inputBox"
        value={input}
        onChange={(e)=> setInput(e.target.value)}
        onBlur={()=>setShowResults(false)}
        onFocus={() => setShowResults(true)}
        >
      </input>
      {
        showResults && <div className='result-container'>
        {results.map((r) => <span className='list-item' key={r.id}>{r.name}</span>)}
      </div>
      }
    </div>
  );
}

export default App;
