import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import { 
  auth,
  signInWithGooglePopup, 
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

import './authentication.style.scss';


const Authentication = () => {

// creiamo questa funzione asincrona dove l utente inizialmente con il metodo signwithGPopup
// che abbiam creato di la, si registra al sito; fatto questo utilizzaiamo il seguente metodo,
// createUser.. per la creazione dell utente nel databas
// metto metodo in lettura xke gli cambiam posizione nel componont di sign in

/*
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  }; */


// qua e' l ipotetico codice per l aggiunta dell autenticazione con redirect, la prima parte 
// da settare nelle utils e' uguale alla precedente, il codice qua un pelo diverso xke
// con il redirect 'usciamo' temporaneamente dalla pagina. sotto anche il botton da aggiungere 
// all impaginazione

/* useEffect(async() => {
  const response = await getRedirectResult(auth);
  if (response) {
    const userDocRef = await createUserDocumentFromAuth(response.user)
  }
 }, []);
 
 <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>
 */


  return (
    <div className='authentication-container'>
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
