import React, { useState, useEffect, useRef } from "react";
const mtg = require("mtgsdk");

const MenuContainer = ({ setSelectedCard }) => {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);

  const loadCards = async () => {
    const query = {
      pageSize: 10,
      page: currentPage,
      ...(searchQuery && { name: searchQuery }),
    };
    const fetchedCards = await mtg.card.where(query);
    setCards(fetchedCards);
  };

  useEffect(() => {
    loadCards();
  }, [currentPage, searchQuery]);

  const handleSearchClick = () => {
    setSearchQuery(searchInputRef.current.value);
    setCurrentPage(1);
  };

  return (
    <div className="menu-container">
      <div id="search">
        <input
          type="text"
          id="searchInput"
          placeholder="Search cards by name"
          ref={searchInputRef}
        />
        <button id="searchButton" onClick={handleSearchClick}>
          Search
        </button>
      </div>

      <h2>Cards</h2>
      <ul id="listContainer">
        {cards.map((card) => (
          <li key={card.id} onClick={() => setSelectedCard(card)}>
            {card.name}
          </li>
        ))}
      </ul>

      <div id="pagination">
        <button
          id="prevPage"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <button
          id="nextPage"
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default MenuContainer;
