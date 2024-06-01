import './App.css';
import Icon from './Icon.js';
import { useState, useEffect } from 'react';

function Series({ name, folder, primary, background }) {
    const [hidden, setHidden] = useState(() => {
        const localStorageValue = localStorage.getItem(`${folder}_hidden`);
        return localStorageValue ? JSON.parse(localStorageValue) : false;
    });
    
    useEffect(() => {
        localStorage.setItem(`${folder}_hidden`, hidden);
    }, [hidden, folder]);

    let images = null;
    if (folder === "one") images = require.context("./icons/one", true);
    else if (folder === "two") images = require.context("./icons/two", true);
    else if (folder === "three") images = require.context("./icons/three", true);
    else if (folder === "four") images = require.context("./icons/four", true);
    else if (folder === "toilet") images = require.context("./icons/toilet", true);
    else if (folder === "bath") images = require.context("./icons/bath", true);
    else if (folder === "living") images = require.context("./icons/living", true);
    else if (folder === "bed") images = require.context("./icons/bed", true);
    else if (folder === "yoga") images = require.context("./icons/yoga", true);
    else if (folder === "cheer") images = require.context("./icons/cheer", true);
    else if (folder === "museum") images = require.context("./icons/museum", true);
    else if (folder === "@work") images = require.context("./icons/@work", true);
    else if (folder === "dressing") images = require.context("./icons/dressing", true);
    else if (folder === "exercising") images = require.context("./icons/exercising", true);
    else if (folder === "moving") images = require.context("./icons/moving", true);
    const imageList = images.keys().map(image => images(image));

    return (
        <div className="Series" style={!hidden ? {backgroundColor: background} : null}>
            <div className="Series-title" style={{backgroundColor: primary}} onClick={() => setHidden(!hidden)}>{name}</div>
            <div className="Icon-container">
                {!hidden ?
                    imageList.map((image, index) => (
                        <Icon key={index} src={image} alt={image.substring(14, image.indexOf("."))} color={primary} />
                    )) : null
                }
                {!hidden ?
                    <Icon alt={"Smiski Secret"} color={primary} /> : null
                }
            </div>
        </div>
    )
}

export default Series;