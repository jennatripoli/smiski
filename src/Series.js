import "./App.css";
import Icon from "./Icon.js";
import { useState, useEffect } from "react";

function Series({ name, folder, primary, background }) {
  const touchscreen =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0;

  const [hidden, setHidden] = useState(() => {
    const localStorageValue = localStorage.getItem(`${folder}_hidden`);
    return localStorageValue
      ? JSON.parse(localStorageValue)
      : touchscreen
      ? true
      : false;
  });

  useEffect(() => {
    localStorage.setItem(`${folder}_hidden`, hidden);
  }, [hidden, folder]);

  const folderPaths = {
    one: require.context("./icons/one", true),
    two: require.context("./icons/two", true),
    three: require.context("./icons/three", true),
    four: require.context("./icons/four", true),
    toilet: require.context("./icons/toilet", true),
    bath: require.context("./icons/bath", true),
    living: require.context("./icons/living", true),
    bed: require.context("./icons/bed", true),
    yoga: require.context("./icons/yoga", true),
    cheer: require.context("./icons/cheer", true),
    museum: require.context("./icons/museum", true),
    "@work": require.context("./icons/@work", true),
    dressing: require.context("./icons/dressing", true),
    exercising: require.context("./icons/exercising", true),
    moving: require.context("./icons/moving", true),
    sunday: require.context("./icons/sunday", true),
  };
  
  const images = folderPaths[folder];
  const imageList = images ? images.keys().map((image) => images(image)) : [];  

  return (
    <div
      className="Series"
      style={!hidden ? { backgroundColor: background } : null}
    >
      <div
        className="Series-title"
        style={{ backgroundColor: primary }}
        onClick={() => setHidden(!hidden)}
      >
        {name}
      </div>
      <div className="Icon-container" style={hidden ? { margin: 0 } : null}>
        {!hidden
          ? imageList.map((image, index) => (
              <Icon
                key={index}
                series={name}
                src={image}
                alt={image.substring(21, image.indexOf("."))}
                color={primary}
              />
            ))
          : null}
        {!hidden ? (
          <Icon series={name} alt={"Smiski Secret"} color={primary} />
        ) : null}
      </div>
    </div>
  );
}

export default Series;
