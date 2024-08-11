import { useState } from 'react';
import axios from 'axios';
import "./createcard.css"

const CreateCard = () => {
    const [formData, setFormData] = useState({
        imgSrc: '',
        imgAlt: '',
        title: '',
        description: '',
        buttonText: '',
        link: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/newcard', formData);

            if (response.status === 200) {
                alert('Card created successfully!');
                // addCard(response.data); // Add the new card to the existing state
                setFormData({
                    imgSrc: '',
                    imgAlt: '',
                    title: '',
                    description: '',
                    buttonText: '',
                    link: ''
                });
            } else {
                alert('Error creating card');
            }
        } catch (error) {
            console.error('Error creating card:', error);
            alert('An error occurred while creating the card.');
        }
    };

    return (
        <div>
            <nav>
                <ul>
                    <li><a href="/admin/cards">Home</a></li>
                    <li><a href="/admin/createcard">Create Card</a></li>
                </ul>
            </nav>
            <main>
                <h1>Create a New Card</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Image URL:
                        <input
                            type="url"
                            name="imgSrc"
                            value={formData.imgSrc}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Image Alt Text:
                        <input
                            type="text"
                            name="imgAlt"
                            value={formData.imgAlt}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Title:
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Description:
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Button Text:
                        <input
                            type="text"
                            name="buttonText"
                            value={formData.buttonText}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Button Link:
                        <input
                            type="url"
                            name="link"
                            value={formData.link}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <button type="submit">Create Card</button>
                </form>
            </main>
        </div>
    );
};

export default CreateCard;
