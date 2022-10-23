import React, {useState} from "react";

import { createDeck } from "../utils/api";
import ErrorMessage from "../Home/ErrorMessage";
import { useHistory} from "react-router-dom";
import NavBar from "../Layout/NavBar";


export const CreateDeck = () => {
// const [deck, setDeck] = useState({});
const [error, setError] = useState(undefined); 

const initialdeck = {id:"",name:"",description:""};
const deck = {initialdeck};

const history = useHistory();

const initialFormState = {
    name: "",
    description: "",
};
const [formData, setFormData] = useState({ ...initialFormState });

const handleChange = ({ target }) => {
  setFormData({
    ...formData,
    [target.name]: target.value,
  });
};


const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.name && formData.description ){
        async function loadDeck() {
            const deckin = {name:formData.name,description:formData.description}
            const abortController = new AbortController();  
            const response = await createDeck(deckin,abortController.signal).catch(setError);            
            const deck = Object.assign(initialdeck, response);
            // setDeck({...response});
            history.push(`/decks/${deck.id}`);
        }
        loadDeck();   
   }
};


if (error) {
    return <ErrorMessage error={error} />;
  }
    return (
    <div>  
        <NavBar deck={deck}/>
        <div>
            <h2>Create Deck</h2>
            <br />
            <form onSubmit={handleSubmit}>
                <dl>
                    <dt> <label htmlFor="name">
                        Name  </label>
                    </dt>
                    <dt>
                        <input
                        id="name"
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={formData.name}
                        size={98}
                        />             
                    </dt>
                    <br/>              
                    <dt><label htmlFor="description">
                        Description </label> </dt>
                       <dt> <textarea
                        id="description"
                        type="description"
                        name="description"
                        onChange={handleChange}
                        value={formData.description}
                        rows={4} cols={100}
                        />                       
                    </dt>
                </dl>
                <br />
                <button name="Cancel" onClick={() => history.push(`/`)}>Cancel</button>
                <button type="submit">Submit</button>
                </form>  
        </div>
    </div>
    )
}

export default CreateDeck;

