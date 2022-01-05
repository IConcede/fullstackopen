const PersonForm = ({newName, setNewName, newNumber, setNewNumber, handleChange, handleSubmit}) => {
    return(
      <form onSubmit={handleSubmit}>
          <div>
            name: <input value={newName} onChange={handleChange(setNewName)} />
            <br/>
            number: <input value={newNumber} onChange={handleChange(setNewNumber)} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    );
};

export default PersonForm;