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
    const timer = setTimeout(() => {
      fetchData();
    }, 400);
    // return statement must and should to clear timer and it is called debouncing
    // when useeffect returns something that will execute after demounting that componenet
    return ()=>{
      clearTimeout(timer);
    } 
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
          {results.map((r) => <span className='list-item'
            onSelect={(e) => setInput(e.target.value)}
            key={r.id}>
            {r.name}
          </span>)
          }
        </div>
      }
    </div>
  );
}

export default App;
