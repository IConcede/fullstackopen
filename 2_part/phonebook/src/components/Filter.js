const Filter = ({newFilter, setNewFilter, handleChange}) => {
    return(
      <>
      filter shown with<input value={newFilter} onChange={handleChange(setNewFilter)}/>
      </>
    );
};

export default Filter;