import { useState } from "react";

const emailRe = /\S+@\S+\.\S+/

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameIsTouched, setEnteredNameIsTouched] = useState(false);
  const enteredNameIsValid = enteredName.trim() !== ''; 
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameIsTouched;

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredEmailIsTouched, setEnteredEmailIsTouched] = useState(false);
  const enteredEmailIsValid = emailRe.test(enteredEmail) && enteredEmail.length >= 7
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailIsTouched;

  const formIsValid = (enteredEmailIsValid && enteredEmailIsTouched) && (enteredNameIsValid && enteredNameIsTouched) 

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };
 
  const nameInputBlurHandler = (event) => {
    setEnteredNameIsTouched(true);
  };

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
 
  const emailInputBlurHandler = (event) => {
    setEnteredEmailIsTouched(true);
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    setEnteredNameIsTouched(true);
    setEnteredEmailIsTouched(true);
    if (!formIsValid) {
      console.log("Invalid form.");
      return;
    }
    console.log({name: enteredName, email: enteredEmail});
    setEnteredName('');
    setEnteredNameIsTouched(false);
    setEnteredEmail('');
    setEnteredEmailIsTouched(false);
  };

  const nameInputClass = nameInputIsInvalid ? 'form-control invalid' : 'form-control';
  const emailInputClass = emailInputIsInvalid ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClass}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          value={enteredName}
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler} />
        {nameInputIsInvalid && <p className='error-text'>Invalid Name.</p>}
      </div>
      <div className={emailInputClass}>
        <label htmlFor='email'>Your E-Mail</label>
        <input
          type='email'
          id='email'
          value={enteredEmail}
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler} />
        {emailInputIsInvalid && <p className='error-text'>Invalid e-mail.</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
