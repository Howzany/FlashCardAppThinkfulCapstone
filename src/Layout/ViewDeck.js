
import React, {useState, useEffect} from "react";
import Card from "./Card";
import { Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import { readDeck } from "../utils/api";
import ErrorMessage from "../Home/ErrorMessage";
import { useHistory} from "react-router-dom";
import { deleteCard } from "../utils/api";
import { deleteDeck } from "../utils/api";


export const ViewDeck = () => {

const params = useParams();
const [deck, setDeck] = useState({});
const [error, setError] = useState(undefined); 

const deckId = params.deckId;

const history = useHistory();

useEffect(() => {
        const deckId = params.deckId;
        const abortController = new AbortController();  
        readDeck(deckId,abortController.signal).then(setDeck).catch(setError);     
        return () => abortController.abort();
}, [params.deckId]);

const handleClick = () => {
  if(window.confirm("Are you sure to delete the deck? Click OK to confirm ")){
     
        async function deleteDeckCard(deckin) {
          const abortController1 = new AbortController();
          const abortController2 = new AbortController();
          for(let i=1; i<deckin.cards.length; i++) {
               await deleteCard(i,abortController1.signal).catch(setError);
           }
          await deleteDeck(deck.id,abortController2.signal).catch(setError);
          history.push("/");
        }
        deleteDeckCard(deck);       
  } 
}   

const handleEdit = () => {
  console.log("before go to edit");
  history.push(`/decks/${deck.id}/edit`);
}

if (error) {
  return <ErrorMessage error={error} />;
}

if(deck.id) {
  const cardlist = deck.cards.map((card) => (<Card key={card.id} card={card} />));
  console.log("cardlist",cardlist);
   return (
    <div>
          <NavBar deck={deck} />
          <div className="border p-4 h-100 d-flex flex-column"> 
                  <h3>{deck.name}</h3>
                  <p>{deck.description}</p>
                  <div>                    
                      <button onClick={handleEdit}> Edit </button>
                      <button onClick={() => history.push(`/decks/${deck.id}/study`)}>Study</button>
                      <button onClick={() => history.push(`/decks/${deckId}/cards/new`)}> + Add Card</button>
                      <button onClick={()=> handleClick()}>Delete</button>
                  </div>
          </div>          
          <br></br>
          <div className="border p-4 h-100 d-flex flex-column">
              <Route exact path="/decks/:deckId">
                  <h2>Cards</h2>
                  <main className="container">
                    <section className="row">{cardlist}</section>
                </main>          
              </Route>
          </div>
       
    </div>
  )
}  else {
  return (
        <div>
          <p>No deck found!</p>
        </div>   
    );
}
}

export default ViewDeck;