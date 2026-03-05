const Notification = ({ message, error}) => {
  if (message === null) {
    return null
  }

  return (
    <div className={`${error ?'failure' :'success'}`}>
      {message}
    </div>
  )
}

export default Notification