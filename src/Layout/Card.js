
import React, {useState} from "react";
import { useRouteMatch } from "react-router-dom";
import { useHistory} from "react-router-dom";
import { deleteCard } from "../utils/api";
import ErrorMessage from "../Home/ErrorMessage";

/*
  TODO: Change the link below to go to the user route, using the user's ID.
  /users/:userId
*/

export const Card = ( {card}  ) => {

const { url, path } = useRouteMatch();
console.log("in Card:", path, url);
const history = useHistory();
const [error, setError] = useState(undefined); 

const handleClick = () => {
    if(window.confirm("Are you sure to delete the card? Click OK to confirm ")){
       
          async function removeCard(card) {
            const abortController = new AbortController();
            await deleteCard(card.id,abortController.signal).catch(setError);
            window.location.reload();
          }
          removeCard(card);    
    } 
  }  

  if (error) {
    return <ErrorMessage error={error} />;
  }
  
  return (
        <div>

            <article className="col-12 col-md-6 col-xl-3 my-2 align-self-stretch"> 
                <div className="border p-4 h-100 d-flex flex-column">
                    <p>{card.front}</p>
                    <p>{card.back}</p>
                
                    <p >
                        {/* <Link to={`${url}/${card.id}`}>Edit</Link> */}
                        <button onClick={() => history.push(`${url}/cards/${card.id}/edit`)}> Edit </button>
                        <button onClick={()=> handleClick()}>Delete</button>
                    </p>
                    
                </div>
            </article>

        </div>
    );

};

export default Card;
