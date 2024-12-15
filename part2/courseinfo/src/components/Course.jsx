
const Header = (props) => {
  return (
    <>
     <h2>{props.course}</h2>
    </>
  )
}

const Content = (props) => {
  const { parts } = props 

  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      )}
    </div>
  )
}

const Total = (props) => {
  const { parts } = props
  const total = parts.reduce((acc, part) => acc + part.exercises, 0)

  return (
    <>
      <p><strong>total of {total} exercises</strong></p>
    </>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} /> 
    </div>
  )
}

export default Course