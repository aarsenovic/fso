import styled from 'styled-components'


const StyledNotification = styled.div`
border: 4px solid lightgreen;
background-color: lightgreen;
font-size: 20px;
padding: 20px;
color: white;
`

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <StyledNotification>
      {message}
    </StyledNotification>
  )
}

export default Notification