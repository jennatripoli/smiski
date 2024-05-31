import './App.css';
import Icon from './Icon.js'

function App() {
  return (
    <div className="App">
      <div className="Series" style={{backgroundColor: "rgb(120, 195, 40, .5)"}}>
        <div className="Series-title" style={{backgroundColor: "#78c328"}}>Series 1</div>
        <div className="Icon-container">
          <Icon src={"s1/1.png"} alt={"Smiski Hugging Knees"} />
          <Icon src={"s1/2.png"} alt={"Smiski Sitting"} />
          <Icon src={"s1/3.png"} alt={"Smiski Looking Back"} />
          <Icon src={"s1/4.png"} alt={"Smiski Lounging"} />
          <Icon src={"s1/5.png"} alt={"Smiski Hiding"} />
          <Icon src={"s1/6.png"} alt={"Smiski Peeking"} />
          <Icon color={"#78c328"} alt={"Smiski Secret"} />
        </div>
      </div>
      <div className="Series" style={{backgroundColor: "rgb(238, 126, 0, .5)"}}>
        <div className="Series-title" style={{backgroundColor: "#ee7e00"}}>Series 2</div>
        <div className="Icon-container">
          <Icon src={"s2/1.png"} alt={"Smiski Kneeling"} />
          <Icon src={"s2/2.png"} alt={"Smiski Climbing"} />
          <Icon src={"s2/3.png"} alt={"Smiski Daydreaming"} />
          <Icon src={"s2/4.png"} alt={"Smiski Pushing"} />
          <Icon src={"s2/5.png"} alt={"Smiski Peeking"} />
          <Icon src={"s2/6.png"} alt={"Smiski Listening"} />
          <Icon color={"#ee7e00"} alt={"Smiski Secret"} />
        </div>
      </div>
      <div className="Series" style={{backgroundColor: "rgb(139, 101, 195, .5)"}}>
        <div className="Series-title" style={{backgroundColor: "#8b65c3"}}>Series 3</div>
        <div className="Icon-container">
          <Icon src={"s3/1.png"} alt={"Smiski Bridge"} />
          <Icon src={"s3/2.png"} alt={"Smiski Peeking"} />
          <Icon src={"s3/3.png"} alt={"Smiski Climbing"} />
          <Icon src={"s3/4.png"} alt={"Smiski Little"} />
          <Icon src={"s3/5.png"} alt={"Smiski Hiding"} />
          <Icon src={"s3/6.png"} alt={"Smiski Handstand"} />
          <Icon color={"#8b65c3"} alt={"Smiski Secret"} />
        </div>
      </div>
      <div className="Series" style={{backgroundColor: "rgb(218, 75, 142, .5)"}}>
        <div className="Series-title" style={{backgroundColor: "#da4b8e"}}>Series 4</div>
        <div className="Icon-container">
          <Icon src={"s4/1.png"} alt={"Smiski Sneaking"} />
          <Icon src={"s4/2.png"} alt={"Smiski Scared"} />
          <Icon src={"s4/3.png"} alt={"Smiski Relaxing"} />
          <Icon src={"s4/4.png"} alt={"Smiski Lazy"} />
          <Icon src={"s4/5.png"} alt={"Smiski Stuck"} />
          <Icon src={"s4/6.png"} alt={"Smiski Defeated"} />
          <Icon color={"#da4b8e"} alt={"Smiski Secret"} />
        </div>
      </div>
    </div>
  );
}

export default App;
