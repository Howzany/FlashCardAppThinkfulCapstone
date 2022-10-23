import React, {useState, useEffect} from "react";

import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import ErrorMessage from "../Home/ErrorMessage";
import { useHistory} from "react-router-dom";
import NavBar from "../Layout/NavBar";

export const StudyDeck = () => {
const params = useParams();
const [deck, setDeck] = useState({});
const [error, setError] = useState(undefined); 

const deckId = params.deckId;

const [showBack, setShowBack] = useState(false);
const [cardNum, setCardNum] = useState(0);
const history = useHistory();

useEffect(() => {
        const abortController = new AbortController();  
        readDeck(deckId,abortController.signal).then(setDeck).catch(setError);     
        return () => abortController.abort();
}, [deckId]);

if (error) {
  return <ErrorMessage error={error} />;
}

const handleClickFlip = () => {
  if (showBack){
    setShowBack(false);
  }
  setShowBack(true);
};

const handleClickNext = () => { 
    setCardNum(cardNum+1);
    setShowBack(false);
};

const handleClickYes = () => { 
  setShowBack(false);
  setCardNum(0);
}

const handleClickNo = () => { 
  history.push("/");
};

if(deck.id) {
   if (cardNum < deck.cards.length){
        if (!showBack) {
            return (
            <div>
                <NavBar deck={deck} />
                <h1>{deck.name}</h1>
                <h1>Study</h1>
                <div className="border p-4 h-100 d-flex flex-column"> 
                        <h3> Card {cardNum+1} of {deck.cards.length}</h3>
                          <p>{deck.cards[cardNum].front}</p>
                </div> 
                <button onClick={() => handleClickFlip()}>Flip</button>
            </div>
            )
        }
          return (
            <div>
                <NavBar deck={deck} />
                <h1>{deck.name}</h1>
                <h1>Study</h1>
                <div className="border p-4 h-100 d-flex flex-column">
                  <h3> Card {cardNum+1} of {deck.cards.length}</h3> 
                          <p>{deck.cards[cardNum].back}</p>
                </div> 
                <button onClick={() => handleClickFlip()}>Flip</button>
                <button onClick={() => handleClickNext()}>Next</button>
             </div>
          )
      } else if (deck.cards.length<3) {
              return (
                <div>
                    <NavBar deck={deck} />
                    <div className="border p-4 h-100 d-flex flex-column"> 
                            <h1>{deck.name}</h1>
                            <h1>Study</h1>
                              <h2>Not enough cards</h2>
                              <p>You need at least 3 cards to study. There are {deck.cards.length} cards in this deck</p>               
                    </div> 
                    <button onClick={() => history.push(`/decks/${deckId}/cards/new`)}> + Add Card</button>
                </div>
              )

      } else {
      return (
        <div>
          <NavBar deck={deck} />
          <div className="border p-4 h-100 d-flex flex-column"> 
                <h1>{deck.name}: Study</h1>
                <p>All Cards are finished. Do you want to restudy the deck?</p>
          </div> 
          <button onClick={() => handleClickYes()}>Yes</button>
          <button onClick={() => handleClickNo()}>No</button>
        </div>
      );
    }
  } else {
  return (
        <div>
          <p>No deck found!</p>
        </div>   
    );
}
}

export default StudyDeck;