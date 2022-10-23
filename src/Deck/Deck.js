
import React, {useState} from "react";

import { useHistory} from "react-router-dom";
import { deleteDeck } from "../utils/api";
import { deleteCard } from "../utils/api";
import ErrorMessage from "../Home/ErrorMessage";


/*
  TODO: Change the link below to go to the user route, using the user's ID.
  /users/:userId
*/

export const Deck = ({ deck = { decks: [] } }) => {
  const [error, setError] = useState(undefined); 


  const history= useHistory();

  const handleClick = () => {
    if(window.confirm("Are you sure to delete the deck? Click OK to confirm ")){
       
          async function deleteDeckCard(deckin) {
            const abortController1 = new AbortController();
            const abortController2 = new AbortController();
             for(let i=1; i<deckin.cards.length; i++) {
                 await deleteCard(i,abortController1.signal).catch(setError);
             }
             await deleteDeck(deck.id,abortController2.signal).catch(setError);
             window.location.reload();
          }
          deleteDeckCard(deck); 
         
    } 
  }    

  if (error) {
    return <ErrorMessage error={error} />;
  }
  
  return (
      <div>
        <article className="col-12 col-md-6 col-xl-3 my-2 align-self-stretch">
          <div>
              <div className="border p-4 h-100 d-flex flex-column">
                 <h2>{deck.name}</h2>
                 <h3>{deck.cards.length} cards</h3>
                 <p>{deck.description}</p>
              </div>
                 <div>
                    <p className="font-weight-lighter flex-fill">
                        <button name="Study" onClick={() => history.push(`/decks/${deck.id}/study`)}>Study</button>
                        <button name="View" onClick={() => history.push(`/decks/${deck.id}`)}>View</button>
                        <button onClick={()=> handleClick()}>Delete</button>
                    </p>
                </div>
            </div>
        </article>
        <br/>
     </div>
);
}

export default Deck;
