import "./admincards.css";
import { Navbar } from "../navbar/navbar";
import { Card } from "../card/card";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export const AdminCards = ({ cards, setCards }) => {
    const navigate = useNavigate();

    const handleCreateCard = () => {
        navigate('/admin/createcard');
    };

    const handleDeleteCard = async (cardId) => {
        try {
            const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
            const response = await axios.delete(`http://localhost:3000/card/${cardId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setCards(cards.filter(card => card._id !== cardId));
                alert("Card deleted successfully");
            } else {
                alert('Error deleting the card');
            }
        } catch (error) {
            console.error("Error deleting card:", error);
        }
    };

    return (
        <div>
            <Navbar />
            <button onClick={handleCreateCard}>Create a New Card</button>
            <div className="cardscontainer">
                {cards.map((card) => (
                    <Card key={card._id} card={card} onDelete={() => handleDeleteCard(card._id)} isAdmin={true} />
                ))}
            </div>
        </div>
    );
};
