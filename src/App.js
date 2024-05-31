import './App.css';
import Series from './Series.js'

function App() {
  return (
    <div className="App">
      <Series name="Series 1" folder="s1" primary={"#78c328"} background={"rgb(120, 195, 40, .5)"} />
      <Series name="Series 2" folder="s2" primary={"#ee7e00"} background={"rgb(238, 126, 0, .5)"} />
      <Series name="Series 3" folder="s3" primary={"#8b65c3"} background={"rgb(139, 101, 195, .5)"} />
      <Series name="Series 4" folder="s4" primary={"#da4b8e"} background={"rgb(218, 75, 142, .5)"} />
    </div>
  );
}

export default App;
