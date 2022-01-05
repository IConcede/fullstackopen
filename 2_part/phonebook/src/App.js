import { useState, useEffect } from 'react'
import { personsService } from './services/persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    personsService
      .getAll()
      .then(response => setPersons(response));
    }
  ,[]);

  const clearForm = (newPerons) => {
    setPersons(newPerons);
    setNewName('');
    setNewNumber('');
  }

  const handleSubmit = event => {
    event.preventDefault();
    const exitstedPerson = persons.find(person => person.name === newName);

    if(exitstedPerson) {
      const confirmed = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`);

      if(confirmed){
        personsService
          .update(exitstedPerson.id, {...exitstedPerson, number: newNumber})
          .then(response => {
            setNewMessage(`Changed ${newName}`);

            clearForm(persons.map(
              person => {
                if(person.id === response.id) {
                  return {...exitstedPerson, number: newNumber}
                } else return person
              })
            );

            setTimeout(()=> setNewMessage(''), 3000);})

          .catch(err => {
            if(err.response.status === 404){
              personsService.getAll()
                .then(response => setPersons(response));
              clearForm(persons);
              setNewMessage(`Information of ${newName} has already been removed from server`);
              setTimeout(()=> setNewMessage(''), 3000);}
            })
      }

    } else {
      const newPerson = {name: newName, number: newNumber}
      personsService
        .create(newPerson)
        .then(response => {
          setNewMessage(`Added ${newName}`);
          clearForm(persons.concat(response));
          setTimeout(()=> setNewMessage(''), 3000);
        });
    }
  };

  const handleChange = setInput => event => setInput(event.target.value);
  
  const handleDelete = (id) => {
    const name = persons.find(person => person.id === id).name;
    const confirmed = window.confirm(`Delete ${name}`);
    
    if(confirmed){
      personsService
        .remove(id)
        .then(() => setPersons(
          persons.filter(person => person.id !== id))
          )
        .catch(err => alert(err));
    };
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newMessage}/>
      <Filter newFilter={newFilter} setNewFilter={setNewFilter} handleChange={handleChange}/>
      <h3>add a new</h3>
      <PersonForm 
        newName={newName} setNewName={setNewName} 
        newNumber={newNumber} setNewNumber={setNewNumber}
        handleChange={handleChange} handleSubmit={handleSubmit}
        />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={newFilter} handleDelete={handleDelete}/>
      
    </div>
  )
}

export default App