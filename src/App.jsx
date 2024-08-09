import { useState } from 'react'

import './App.css'
import { Card } from './components/card'
function App() {
  

  return (
    <div class="App">
      <Card 
      imgSrc="https://picsum.photos/300/200" 
      imgAlt="Card Image" 
      title="Darshan Sojitra"
      description={"Software Developer"} 
      buttonText={"Contact"}
      link={"link"}
      ></Card>
    </div>
  )
}

export default App
