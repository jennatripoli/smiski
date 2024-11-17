import "./App.css";
import { useState, useEffect } from "react";

function Icon({ series, src, alt, color }) {
  const [className, setClassName] = useState(() => {
    const localStorageValue = localStorage.getItem(`${series}_${alt}_className`);
    return localStorageValue ? localStorageValue : "Icon-image";
  });

  useEffect(() => {
    localStorage.setItem(`${series}_${alt}_className`, className);
  }, [className, series, alt]);

  const onClick = () => {
    if (className === "Icon-image") setClassName("Icon-image-selected");
    else setClassName("Icon-image");
  };

  return (
    <div className="Icon">
      {src ? (
        <img
          className={className}
          style={{ backgroundColor: color }}
          src={src}
          alt={alt}
          onClick={onClick}
        />
      ) : (
        <div
          className={className}
          style={{ backgroundColor: color }}
          alt={alt}
          onClick={onClick}
        >
          ?
        </div>
      )}
      <label className="Icon-title">{alt}</label>
    </div>
  );
}

export default Icon;
