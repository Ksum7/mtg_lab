import React from "react";

const CardDetailsContainer = ({ deck, selectedCard, setDeck }) => {
  const addCardToDeck = (card) => {
    setDeck((prevDeck) => {
      const cardCount = prevDeck[card.id]?.count || 0;
      if (cardCount >= 4 && !card.type.includes("Land")) {
        alert("Maximum of 4 copies allowed");
        return prevDeck;
      }
      return {
        ...prevDeck,
        [card.id]: { card, count: cardCount + 1 },
      };
    });
  };

  const removeCardFromDeck = (card) => {
    setDeck((prevDeck) => {
      const cardInfo = prevDeck[card.id];
      if (!cardInfo) return prevDeck;

      if (cardInfo.count === 1) {
        const { [card.id]: _, ...rest } = prevDeck;
        return rest;
      } else {
        return {
          ...prevDeck,
          [card.id]: { ...cardInfo, count: cardInfo.count - 1 },
        };
      }
    });
  };

  const selectedInDeck = () => {
    return Boolean(deck[selectedCard.id])
  };

  if (!selectedCard) {
    return (
      <div id="cardDetailsContainer">
        <h2>Card Details</h2>
        <p>Select a card to view details</p>
      </div>
    );
  }

  return (
    <div id="cardDetailsContainer">
      <h2>Card Details</h2>
      <div id="cardDetails">
        {selectedCard.imageUrl ? (
          <img
            src={selectedCard.imageUrl}
            alt={selectedCard.name}
            className="card-image"
          />
        ) : (
          <div className="placeholder-large">No Image Available</div>
        )}

        <div className="card-description">
          <h2>{selectedCard.name}</h2>
          <p>
            <strong>Mana Cost:</strong> {selectedCard.manaCost}
          </p>
          <p>
            <strong>Type:</strong> {selectedCard.type}
          </p>
          <p>
            <strong>Rarity:</strong> {selectedCard.rarity}
          </p>
          <p>
            <strong>Description:</strong> {selectedCard.text}
          </p>
        </div>
      </div>
      <button
        className="addCardToDeck"
        onClick={() => addCardToDeck(selectedCard)}
      >
        Add Card to Deck
      </button>
      {selectedInDeck() && (
        <button
          className="removeCardFromDeck"
          onClick={() => removeCardFromDeck(selectedCard)}
        >
          Remove Card from Deck
        </button>
      )}
    </div>
  );
};

export default CardDetailsContainer;
