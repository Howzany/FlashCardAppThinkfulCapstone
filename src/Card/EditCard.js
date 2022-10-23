import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import ErrorMessage from "../Home/ErrorMessage";
import NavBar from "../Layout/NavBar";
import { useHistory } from "react-router-dom";
import { readCard } from "../utils/api";
import { updateCard } from "../utils/api";
import CardForm from "./CardForm";

export const EditCard = () => {
  const params = useParams();

  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const [error, setError] = useState(undefined);
  const history = useHistory();
  const deckId = params.deckId;

  const initialdeck = { id: "", name: "", description: "" };

  const initialcard = { id: "", front: "", back: "", deckId: "" };

  const initialFormState = {
    front: card.front,
    back: card.back,
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  useEffect(() => {
    async function loadDeckCard() {
      const deckId = params.deckId;
      const cardId = params.cardId;
      const abortController = new AbortController();
      const responseDeck = await readDeck(deckId, abortController.signal).catch(
        setError
      );
      const responseCard = await readCard(cardId, abortController.signal).catch(
        setError
      );
      const deckin = Object.assign(initialdeck, responseDeck);
      const cardin = Object.assign(initialcard, responseCard);
      setDeck({ ...deckin });
      setCard({ ...cardin });
      setFormData({ ...cardin });
    }
    loadDeckCard();
  }, [deck.id, card.id]);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit");
    if (formData.front && formData.back) {
      async function loadCard() {
        const cardin = {
          id: card.id,
          front: formData.front,
          back: formData.back,
          deckId: deck.id,
        };
        const abortController = new AbortController();
        await updateCard(cardin, abortController.signal).catch(setError);
        history.push(`/decks/${deck.id}`);
      }
      loadCard();
    }
  };

  if (deck.id) {
    return (
      <div>
        <NavBar deck={deck} />
        <div>
          <h2>Edit Card</h2>
          <CardForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            formData={formData}
          />
        </div>
      </div>
    );
  } else {
    return <p> Deck Not Found</p>;
  }
};

export default EditCard;
