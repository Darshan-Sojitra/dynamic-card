import "./admincards.css";
import { Navbar } from "../navbar/navbar";
import { Card } from "../card/card";
import { useNavigate } from 'react-router-dom';

export const AdminCards = ({ cards }) => {
    const navigate = useNavigate();

    const handleCreateCard = () => {
        navigate('/admin/createcard');
    };

    return (
        <div>
            <Navbar />
            <button onClick={handleCreateCard}>Create a New Card</button>
            <div className="cardscontainer">
            {cards.map((card) => (
                <Card key={card._id} card={card} />
            ))}
            </div>
        </div>
    );
}
