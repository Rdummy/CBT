import React from "react";
import Card from "./Card";

function CardsGrid({ cards, editCard, deleteCard }) {
  return (
    <div className="cards-grid">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          editCard={() => editCard(card.id)}
          deleteCard={() => deleteCard(card.id)}
        />
      ))}
    </div>
  );
}

export default CardsGrid;
