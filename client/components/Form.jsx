export default function Form(props) {
  return (
    <form className="login-form" onSubmit={props.handleSubmit}>
      <div className="input-wrapper">
        <input 
          onChange={props.handleUsernameInput}
          value={props.username} 
          type='text' 
          placeholder='Username' />

        <input 
          onChange={props.handlePasswordInput} 
          value={props.password} 
          type='password' 
          placeholder='Password' />
      </div>
      
      <button className="login-btn">
        {props.submitBtnText}
      </button>
    </form>
  )
}