import React, { useState } from "react";
import CreateCardForm from "./CreateCardForm";
import CardsGrid from "./CardsGrid";
import "./ck-create-content.css";

function CKCreateContent() {
  const [cards, setCards] = useState([]);

  const addCard = (card) => {
    setCards([...cards, { ...card, id: Date.now() }]);
  };

  const editCard = (id, updatedCard) => {
    setCards(
      cards.map((card) => (card.id === id ? { ...updatedCard, id } : card))
    );
  };

  const deleteCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  return (
    <>
      <div className="create-content-app">
        <h1 className="top-title">Create Content</h1>
        <CreateCardForm addCard={addCard} />
      </div>
      <CardsGrid cards={cards} editCard={editCard} deleteCard={deleteCard} />
    </>
  );
}

export default CKCreateContent;
