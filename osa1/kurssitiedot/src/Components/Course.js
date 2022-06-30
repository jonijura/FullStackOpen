const Header = (props) => {
    return (
      <div>
        <h2>{props.course}</h2>
      </div>
    )
  }
  
  const Content = (props) => {
    return (
      <div>
        {props.parts.map(part =>
          <p key={part.id}>{part.name} {part.exercises}</p>
        )}
      </div>
    )
  }
  
  const Total = (props) => {
    const sum = props.parts.reduce( (p, c) => p+c.exercises,0)
    return (
      <p><b>Total of {sum} exercises</b></p>
    )
  }
  
  const Course = ({ course }) => {
    return (<div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>)
  }

  export default Course