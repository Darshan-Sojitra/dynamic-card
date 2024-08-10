import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Card } from './components/card/card';
import { Navbar } from './components/navbar/navbar';
import Signup from './components/sigunup/signup';
import { AdminCards } from './components/admincards/admincards';
import { useEffect } from 'react';
import axios from 'axios';

function App() {
  const [cards,setCards]= useState([]);
  const addCard = (newCard)=>{
    setCards(prevCards =>[...prevCards,newCard])
  }


  useEffect(() => {
    axios.get("http://localhost:3000/cards")
      .then(response => {
        // Assuming the response contains an array in `cards`
        console.log(response.data); // Logs the full response data
        setCards(Array.isArray(response.data.cards) ? response.data.cards : []);
      })
      .catch(error => {
        console.error("Failed to fetch cards:", error);
      });
  }, []);

  return (
    
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/" element={<Card 
                                      imgSrc="https://picsum.photos/300/200"
                                      imgAlt="Card Image" 
                                      title="Darshan Sojitra"
                                      description="Software Developer" 
                                      buttonText="Contact"
                                      link="link"
                                    />} />
          <Route path="/admin/login" element={<Signup />} />
          <Route path="/admin/cards"  element={<AdminCards cards={cards}/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
