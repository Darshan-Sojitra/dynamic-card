// import React from "react";
// import "./card.css"
// export const Card=({card})=>{
//     return <div className="card-container">
//        {card.imgSrc&& <img className="card-img" src={card.imgSrc} alt={card.imgAlt} />}
//         <h2 className="card-title">{card.title}</h2>
//         <p className="card-description">{card.description}</p>
//         <a className="card-btn" href={card.link}>{card.buttonText}</a>
//     </div>
// };

import React from "react";
import "./card.css";

export const Card = ({ card }) => {
    return (
        <div className="card-container">
            {card.imgSrc && <img className="card-img" src={card.imgSrc} alt={card.imgAlt || "Card Image"} />}
            <h2 className="card-title">{card.title}</h2>
            <p className="card-description">{card.description}</p>
            <a className="card-btn" href={card.link}>{card.buttonText}</a>
        </div>
    );
};
