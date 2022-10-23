import React, { useEffect, useState } from "react";
import Deck from "../Deck/Deck";
import { Route } from "react-router-dom";
import { useHistory} from "react-router-dom";
import { listDecks } from "../utils/api";
import ErrorMessage from "../Home/ErrorMessage";

export const DeckList = ( ) => {
  
  const [decks, setDecks] = useState([]);
  const [error, setError] = useState(undefined); 
  const history= useHistory();
     
  useEffect(() => {
      const abortController = new AbortController();  
      listDecks(abortController.signal).then(setDecks).catch(setError);
  
      return () => abortController.abort();
    }, []);

  if (error) {
    return <ErrorMessage error={error} />;
  }
  const list = decks.map((deck) => <Deck key={deck.id} deck={deck} />);
 
  return (
    <div>
        <main className="font-weight-lighter flex-fill">
            <button name="View" onClick={() => history.push(`/decks/new`)}>+Create Deck</button>
        </main>
        <Route exact path="/">
          <main className="container">
              <section className="row">{list}</section>
          </main>
        </Route>
    </div>
  );
};

export default DeckList;