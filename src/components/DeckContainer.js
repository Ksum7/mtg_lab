import React from "react";

const DeckContainer = ({ deck, setSelectedCard }) => {
  return (
    <div id="deckContainer" className="deck-container">
      <h2>Your Deck</h2>
      <div id="deckCards" className="deck-cards">
        {Object.entries(deck).map(([cardId, cardInfo]) => {
          const { card, count } = cardInfo;
          return (
            <div
              key={cardId}
              className="deck-card"
              onClick={() => setSelectedCard(card)}
            >
              {card.imageUrl ? (
                <img
                  src={card.imageUrl}
                  alt={card.name}
                  className="deck-card-image"
                />
              ) : (
                <div className="placeholder-small">{card.name}</div>
              )}
              <span className="card-count">x{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeckContainer;
