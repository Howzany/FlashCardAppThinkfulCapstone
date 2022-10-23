import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import ErrorMessage from "../Home/ErrorMessage";
import { createCard } from "../utils/api";
import NavBar from "../Layout/NavBar";
import { useHistory } from "react-router-dom";
import CardForm from "./CardForm";

export const AddCard = () => {
  const params = useParams();
  const [deck, setDeck] = useState({});
  const [error, setError] = useState(undefined);
  const history = useHistory();
  const deckId = params.deckId;
  const initialFormState = {
    front: "",
    back: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setDeck).catch(setError);
    return () => abortController.abort();
  }, [deckId]);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit");
    if (formData.front && formData.back) {
      async function loadCard() {
        const cardin = { front: formData.front, back: formData.back };
        const abortController = new AbortController();
        await createCard(deckId, cardin, abortController.signal).catch(
          setError
        );
        setFormData({ ...initialFormState });
      }
      loadCard();
    }
  };

  // const handleClickFlip = () => {
  //   console.log("handleClickFlip",showBack);
  //   if (showBack){
  //     setShowBack(false);
  //   }
  //   setShowBack(true);
  // };

  // const handleClickNext = () => {
  //     setCardNum(cardNum+1);
  //     setShowBack(false);
  // };

  // const handleClickYes = () => {
  //   setShowBack(false);
  //   setCardNum(0);
  // }

  // const handleClickNo = () => {
  //   history.push("/");
  // };

  if (deck.id) {
    return (
      <div>
        <NavBar deck={deck} />
        <div>
          <h2>{deck.name}</h2>
          <h2>Add Card</h2>
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

export default AddCard;
