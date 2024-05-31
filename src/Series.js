import './App.css';
import Icon from './Icon.js';
import { useState } from 'react';

function Series({ name, folder, primary, background }) {
    const [hidden, setHidden] = useState(false);

    let images = null;
    if (folder === "s1") images = require.context("./s1", true);
    else if (folder === "s2") images = require.context("./s2", true);
    else if (folder === "s3") images = require.context("./s3", true);
    else if (folder === "s4") images = require.context("./s4", true);
    const imageList = images.keys().map(image => images(image));

    return (
        <div className="Series" style={!hidden ? {backgroundColor: background} : null}>
            <div className="Series-title" style={{backgroundColor: primary}} onClick={() => setHidden(!hidden)}>{name}</div>
            <div className="Icon-container">
                {!hidden ?
                    imageList.map((image, index) => (
                        <Icon key={index} src={image} alt={image.substring(14, image.indexOf("."))} />
                    )) : null
                }
                {!hidden ?
                    <Icon color={primary} alt={"Smiski Secret"} /> : null
                }
            </div>
        </div>
    )
}

export default Series;