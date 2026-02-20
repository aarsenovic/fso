const Header = ({course}) => {
  return <h1>{course.name}</h1>
}


const Content = ({parts}) => {
  return (
    <div>
        {parts.map(part=><Part part = {part} key={part.id}/>)}
    </div>
  )
}


const Total = ({parts}) => {
  const exercises = parts.map((part)=>part.exercises)
  const total = exercises.reduce((total, number)=> total+number, 0);
  return(
    <>
      <p>Number of exercises {total}</p>
    </>
  )
}

const Part = ({part}) => {
  return <p>{part.name} {part.exercises}</p>
}


const Course = ({course}) => {
  
  return (
    <div>
      <Header course={course}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}




export default Course