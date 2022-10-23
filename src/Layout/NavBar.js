import React from "react";
import { Route,Switch, Link} from "react-router-dom";
import { useParams } from "react-router-dom";

function NavBar({ deck = {  } }) {
const params = useParams(); 
const cardId = params.cardId;

return (
    <Switch>
      <Route exact path="/decks/new">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home </Link>
              <p>Create Deck</p>
            </li>
          </ol>
        </nav> 
      </Route> 
      <Route exact path="/decks/:deckId">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home </Link>
              <p>{deck.name}</p>
            </li>
          </ol>
        </nav> 
      </Route> 
      <Route exact path="/decks/:deckId/study">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home </Link>
              <p>{deck.name}Study</p>
            </li>
          </ol>
        </nav> 
      </Route>
      <Route exact path="/decks/:deckId/cards/new">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home </Link>
              <p>{deck.name}</p>
            </li>
          </ol>
        </nav> 
      </Route> 
      <Route exact path="/decks/:deckId/edit">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home </Link>
              <p>{deck.name}Edit Deck </p>
            </li>
          </ol>
        </nav> 
      </Route>
      <Route exact path="/decks/:deckId/cards/:cardId/edit">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home </Link>
              <p> {deck.name} Edit Card {cardId} </p>
            </li>
          </ol>
        </nav> 
      </Route>  
    </Switch>
  );
}
export default NavBar;

