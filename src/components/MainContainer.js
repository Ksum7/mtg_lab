import React from "react";
import DeckContainer from "./DeckContainer";
import CardDetailsContainer from "./CardDetailsContainer";

const MainContainer = ({ selectedCard, deck, setDeck, setSelectedCard }) => {
  return (
    <div className="main-container">
      <DeckContainer deck={deck} setSelectedCard={setSelectedCard}/>
      <CardDetailsContainer deck={deck} selectedCard={selectedCard} setDeck={setDeck}/>
    </div>
  );
};

export default MainContainer;
