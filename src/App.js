import "./App.css";
import Series from "./Series.js";

function App() {
  return (
    <div className="App">
      <div className="Title">
        <img
          className="Title-image"
          src={require("./top_logo.png")}
          alt="top_logo"
        />
        <label className="Title-text">Tracker</label>
      </div>
      <Series
        name="Series 1"
        folder="one"
        primary={"#78c328"}
        background={"rgb(120, 195, 40, .5)"}
      />
      <Series
        name="Series 2"
        folder="two"
        primary={"#ee7e00"}
        background={"rgb(238, 126, 0, .5)"}
      />
      <Series
        name="Series 3"
        folder="three"
        primary={"#8b65c3"}
        background={"rgb(139, 101, 195, .5)"}
      />
      <Series
        name="Series 4"
        folder="four"
        primary={"#da4b8e"}
        background={"rgb(218, 75, 142, .5)"}
      />
      <Series
        name="Toilet"
        folder="toilet"
        primary={"#52b782"}
        background={"rgb(82, 183, 130, 0.5)"}
      />
      <Series
        name="Bath"
        folder="bath"
        primary={"#20b8c5"}
        background={"rgb(32, 184, 197, 0.5)"}
      />
      <Series
        name="Living"
        folder="living"
        primary={"#f08d74"}
        background={"rgb(240, 141, 116, 0.5)"}
      />
      <Series
        name="Bed"
        folder="bed"
        primary={"#6879ba"}
        background={"rgb(104, 121, 186, 0.5)"}
      />
      <Series
        name="Yoga"
        folder="yoga"
        primary={"#ff6633"}
        background={"rgb(255, 102, 51, 0.5)"}
      />
      <Series
        name="Cheer"
        folder="cheer"
        primary={"#ea5a94"}
        background={"rgb(234, 90, 148, 0.5)"}
      />
      <Series
        name="Museum"
        folder="museum"
        primary={"#e40012"}
        background={"rgb(228, 0, 18, 0.5)"}
      />
      <Series
        name="@Work"
        folder="@work"
        primary={"#00a143"}
        background={"rgb(0, 161, 67, 0.5)"}
      />
      <Series
        name="Dressing"
        folder="dressing"
        primary={"#f5a100"}
        background={"rgb(245, 161, 0, 0.5)"}
      />
      <Series
        name="Exercising"
        folder="exercising"
        primary={"#e15e76"}
        background={"rgb(225, 94, 118, 0.5)"}
      />
      <Series
        name="Moving"
        folder="moving"
        primary={"#e40012"}
        background={"rgb(228, 0, 18, 0.5)"}
      />
      <Series
        name="Sunday"
        folder="sunday"
        primary={"#c94d97"}
        background={"rgb(201, 77, 151, 0.5)"}
      />
      <footer className="Footer">
        All media retrieved from and belongs to{" "}
        <a href="https://smiski.com/">Smiski</a>.
      </footer>
    </div>
  );
}

export default App;
