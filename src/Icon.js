import './App.css';
import { useState } from 'react';

function Icon({ src, alt, color }) {
    const [className, setClassName] = useState("Icon-image");
    
    const onClick = () => {
        if (className === "Icon-image") setClassName("Icon-image-selected");
        else setClassName("Icon-image");
    }

    return (
        <div className="Icon">
            {src ? 
                <img className={className} src={src} alt={alt} onClick={onClick} /> :
                <div className={className} style={{backgroundColor: color}} alt={alt} onClick={onClick}>?</div>
            }
            <label className="Icon-title">{alt}</label>
        </div>
    )
}

export default Icon;