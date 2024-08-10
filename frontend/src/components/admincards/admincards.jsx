// import "./admincards.css"
// import { Navbar } from "../navbar/navbar"
// import { Card } from "../card/card"
// export const AdminCards=(props)=>{
//     return(
//         <div>
//             <Navbar></Navbar>
//             <Card cards={props.cards} ></Card>
//         </div>
//     )
// }

import "./admincards.css";
import { Navbar } from "../navbar/navbar";
import { Card } from "../card/card";

export const AdminCards = ({ cards }) => {
    return (
        <div>
            <Navbar />
            {cards.map((card) => (
                <Card key={card._id} card={card} />
            ))}
        </div>
    );
}
