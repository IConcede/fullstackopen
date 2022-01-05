const Persons = ({persons, filter, handleDelete}) => {
    return(
      <div>
        {persons.map(person => {
          if(person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
            return(
              <div key={person.id}>
                <label>{person.name} {person.number} </label>
                <button onClick={() => handleDelete(person.id)}> delete</button>
              </div>
            );
          return null;
          }
        )}
      </div>
    );
};

export default Persons;