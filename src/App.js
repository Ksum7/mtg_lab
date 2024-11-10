import React, { useState, useEffect } from "react";
import MenuContainer from "./components/MenuContainer";
import MainContainer from "./components/MainContainer";
import StatsContainer from "./components/StatsContainer";

const App = () => {
  const [deck, setDeck] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <body>
      <header>
        <h1>MTG Deck Builder</h1>
      </header>
      <main className="main">
        <MenuContainer setSelectedCard={setSelectedCard}/>
        <MainContainer selectedCard={selectedCard} deck={deck} setDeck={setDeck} setSelectedCard={setSelectedCard}/>
        <StatsContainer deck={deck}/>
      </main>
    </body>
  );
};

export default App;
