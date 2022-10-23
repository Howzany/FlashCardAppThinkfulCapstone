import { useHistory, useParams } from "react-router-dom";

function CardForm({ formData, handleSubmit, handleChange }) {
  const history = useHistory();
  const params = useParams();
  const deckId = params.deckId;
  return (
    <form name="name" onSubmit={handleSubmit}>
      <dl>
        <dt>
          <label htmlFor="front">Front</label>{" "}
        </dt>
        <dt>
          {" "}
          <textarea
            id="front"
            type="text"
            name="front"
            onChange={handleChange}
            value={formData.front}
            rows={4}
            cols={100}
          />
        </dt>
      </dl>
      <dl>
        <dt>
          <label htmlFor="back">Back</label>
        </dt>
        <dt>
          {" "}
          <textarea
            id="back"
            type="text"
            name="back"
            onChange={handleChange}
            value={formData.back}
            rows={4}
            cols={100}
          />
        </dt>
      </dl>

      {/* <Link to={`/decks/${deckId}`}>Done</Link> */}
      <button onClick={() => history.push(`/decks/${deckId}`)}> Done </button>
      <button type="submit">Save</button>
    </form>
  );
}
export default CardForm;
