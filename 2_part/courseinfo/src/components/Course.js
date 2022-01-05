const Header = ({course: name}) => {
    return(
      <>
      <h2>{name}</h2>
      </>
    );
  };
  
  const Content = ({parts}) => {
    return(
      <div>
        {parts.map(part => <Part key={part.id} part={part} />)}
      </div>
    );
  };
  
  const Part = ({part}) => {
    return(
      <>
        <p>
          {part.name} {part.exercises}
        </p>
      </>
    );
  };
  
  const Total = ({parts}) => {
    const result = parts.reduce((sum, current) => sum + current.exercises, 0);
  
    return(
      <>
      <p><strong>total of {result} exercises</strong></p>
      </>
    );
  };
  
  const Course = ({course: {name, parts}}) => {
    return(
      <div>
        <Header course={name} />
        <Content parts={parts} />
        <Total parts={parts} />
      </div>
    );
  };

  export default Course;