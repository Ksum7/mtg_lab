const mtg = require('mtgsdk');
import { ColorStats } from './widgets/colorStats';
import { ManaCostStats } from './widgets/manaCostStats';

document.addEventListener('DOMContentLoaded', setup);

let currentPage = 1;
let pageSize = 10;
let searchQuery = '';
let deck = {};

function setup() {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');

    searchButton.addEventListener('click', () => {
        searchQuery = searchInput.value;
        currentPage = 1;
        loadCards();
    });

    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            loadCards();
        }
    });

    nextPageButton.addEventListener('click', () => {
        currentPage++;
        loadCards();
    });

    loadCards();
}

function loadCards() {
    const query = {
        pageSize: pageSize,
        page: currentPage,
    };
    if (searchQuery) {
        query.name = searchQuery;
    }

    mtg.card.where(query).then((cards) => {
        const menu = document.getElementById('listContainer');
        const list = document.createElement('ul');

        cards.forEach((card) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = card.name;
            listItem.addEventListener('click', () => showCardDetails(card));
            list.appendChild(listItem);
        });

        menu.innerHTML = '';
        menu.appendChild(list);

        updateWidgets();
    });
}

function showCardDetails(card) {
    const addCardToDeckButton = document.createElement('button');
    addCardToDeckButton.textContent = 'Add Card to Deck';

    addCardToDeckButton.className = 'addCardToDeck';

    addCardToDeckButton.addEventListener('click', () => { addCardToDeck(card) });

    const detailsContainer = document.getElementById('cardDetails');
    detailsContainer.innerHTML = '';

    if (card.imageUrl) {
        const imgElement = document.createElement('img');
        imgElement.className = 'card-image';
        imgElement.src = card.imageUrl;
        imgElement.alt = card.name;
        detailsContainer.appendChild(imgElement);
    } else {
        const placeholder = document.createElement('div');
        placeholder.className = 'placeholder-large';
        placeholder.textContent = 'No Image Available';
        detailsContainer.appendChild(placeholder);
    }

    const descriptionContainer = document.createElement('div');
    descriptionContainer.className = 'card-description';

    descriptionContainer.innerHTML = `
        <h2>${card.name}</h2>
        <p><strong>Mana Cost:</strong> ${card.manaCost}</p>
        <p><strong>Type:</strong> ${card.type}</p>
        <p><strong>Rarity:</strong> ${card.rarity}</p>
        <p><strong>Description:</strong> ${card.text}</p>
    `;
    
    detailsContainer.appendChild(descriptionContainer);

    const container = document.getElementById('cardsContainer');

    const existingButton = container.querySelector('.addCardToDeck');
    if (existingButton) {
        container.removeChild(existingButton);
    }

    container.appendChild(addCardToDeckButton);
}

function addCardToDeck(card) {
    const isLand = card.type.includes("Land");
    const cardCount = deck[card.id]?.count || 0;

    if (!isLand && cardCount >= 4) {
        alert('You cannot have more than 4 copies of this card in your deck.');
        return;
    }

    deck[card.id] = {card: card, count: cardCount + 1};

    updateDeckDisplay();
    updateWidgets();
}

function removeCardFromDeck(cardId) {
    if (deck[cardId]) {
        deck[cardId].count--;

        if (deck[cardId].count === 0) {
            delete deck[cardId];
        }
        
        updateDeckDisplay();
        updateWidgets();
    }
}

function updateDeckDisplay() {
    const deckCardsContainer = document.getElementById('deckCards');
    deckCardsContainer.innerHTML = '';

    for (const [cardId, cardInfo] of Object.entries(deck)) {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'deck-card';

        card = cardInfo.card

        if (card.imageUrl) {
            const imgElement = document.createElement('img');
            imgElement.src = card.imageUrl;
            imgElement.alt = card.name;
            imgElement.className = 'deck-card-image';
            cardDiv.appendChild(imgElement);
            imgElement.onclick = () => removeCardFromDeck(cardId);
        } else {
            const placeholder = document.createElement('div');
            placeholder.className = 'placeholder-small';
            placeholder.textContent = card.name;
            cardDiv.appendChild(placeholder);
            placeholder.onclick = () => removeCardFromDeck(cardId);
        }

        const countElement = document.createElement('span');
        countElement.innerText = `x${cardInfo.count}`;
        
        cardDiv.appendChild(countElement);
        
        deckCardsContainer.appendChild(cardDiv);
    }
}

function updateWidgets() {
    new ColorStats().buildStats(document.getElementById('colorStats'), deck);
    new ManaCostStats().buildStats(document.getElementById('manaStats'), deck);
}