import React from "react";
import "./card.css"
export const Card=({
    imgSrc,
    imgAlt,
    title,
    description,
    buttonText,
    link
    })=>{
    return <div className="card-container">
       {imgSrc&& <img className="card-img" src={imgSrc} alt={imgAlt} />}
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
        <a className="card-btn" href={link}>{buttonText}</a>
    </div>
}