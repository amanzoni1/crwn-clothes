import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-up-form.style.scss';

import { 
  createAuthUserWithEmailAndPassword, 
  createUserDocumentFromAuth 
} from "../../utils/firebase/firebase.utils";



const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};


// in seguito abbiam tutto il codice per la creazione di utenti e per la loro registrazione
// nel database di firestore. questi son i soliti due procedimenti che dobbiam fare,
// creare l utente che si registra, e importarlo nel database

const SignUpForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;


// questa funzione e' per pulire il form in seguito all inserimento dei dati
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };


// qua sotto e' per la gestione del submit, prima creiamo l user con la prima funzione await
// e in seguito inseriamo l user nel database con il createUserDocumentFromAuth.
// entrambe queste funzioni le abbiamo create e importate dal firebase utils.
// la seconda riguardante la creazione dell utente nel database e' la stessa ovviamente che utilizziamo
// nel component di sign in. la creazione dell user invece son ovviamente due funz diverse
// nella seconda parte si gestiscono eventuali errori che possono presentarsi

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(password !== confirmPassword) {
      alert('Password do not match');
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);

      await createUserDocumentFromAuth(user, {displayName});

      resetFormFields();

    } catch(error) {
      if(error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      }
      console.log('user creation encountered an error', error);
    }
  };


// qua sotto e' per gestire la compilazione del form, che ci riempie il formFields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };



  return(
    <div className="sign-up-container">
      <h2>I do not have an account</h2>
      <span>Sign Up with your email and password</span>
      <form onSubmit={handleSubmit}>
        
        <FormInput
          label= 'Display Name' 
          type='text' 
          required
          onChange={handleChange}
          name= 'displayName'
          value= {displayName}
        />

        <FormInput
          label= 'Email' 
          type='email' 
          required
          onChange={handleChange}
          name= 'email'
          value= {email}
        />

        <FormInput
          label= 'Password' 
          type='password' 
          required
          onChange={handleChange}
          name= 'password'
          value= {password}
        />

        <FormInput
          label= 'Confirm Password' 
          type='password' 
          required
          onChange={handleChange}
          name= 'confirmPassword'
          value= {confirmPassword}
        />

        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;