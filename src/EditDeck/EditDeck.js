import React, {useState, useEffect} from "react";
import ErrorMessage from "../Home/ErrorMessage";
import { useHistory} from "react-router-dom";
import NavBar from "../Layout/NavBar";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import { updateDeck } from "../utils/api";


export const EditDeck = () => {

    const params = useParams();
    const [error, setError] = useState(undefined); 
    const [deck, setDeck] = useState({});
    const initialdeck = {id:"",name:"",description:""};
          
    const history = useHistory();

    const initialFormState = {
        name: deck.name,
        description: deck.description,
    };
    const [formData, setFormData] = useState({ ...initialFormState });      
   
    useEffect(() => {
            async function loadDeck() {
                const deckId = params.deckId;
                const abortController = new AbortController();  
                const response = await readDeck(deckId,abortController.signal).catch(setError);
                const deckin = Object.assign(initialdeck, response); 
                setDeck({...deckin});
                setFormData({...deckin });
                console.log("in editDeck useEffect-deckin",deckin); 
                console.log("in editDeck useEffect-deck",deck);
            }
            loadDeck();
        }, [deck.id]);

console.log("in EditDeck- deck",deck);
console.log("in EditDeck- formData",formData);

const handleChange = ({ target }) => {
  setFormData({
    ...formData,
    [target.name]: target.value,
  });
};


const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.name && formData.description ){
        async function editDeck() {
            const deckin = {id:deck.id,name:formData.name,description:formData.description}
            const abortController = new AbortController();  
            await updateDeck(deckin,abortController.signal).catch(setError);            
            history.push(`/decks/${deck.id}`);
        }
        editDeck();   
   }
};


if (error) {
    return <ErrorMessage error={error} />;
  }
    return (
    <div>  
        <NavBar deck={deck}/>
        <div>
            <h2>Edit Deck</h2>
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
                <button name="Cancel" onClick={() => history.push(`/decks/${deck.id}`)}>Cancel</button>
                <button type="submit">Submit</button>
                </form>  
        </div>
    </div>
    )
}

export default EditDeck;

