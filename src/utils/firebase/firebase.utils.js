import { initializeApp } from 'firebase/app';

import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
 } from 'firebase/auth';

 import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
 } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBgrUsFQ-bTL-FDXL_IVHJpSoQBhlq-ehg",
  authDomain: "crwn-clothes-db-4eb48.firebaseapp.com",
  projectId: "crwn-clothes-db-4eb48",
  storageBucket: "crwn-clothes-db-4eb48.appspot.com",
  messagingSenderId: "34551202763",
  appId: "1:34551202763:web:50ba6e0e19ffd2d6b1ac4e"
};

const firebaseApp = initializeApp(firebaseConfig);



// sopra e' l inizializzazione di firebase con una config di default che riceviamo
// notare che firebase ha piu funzionalita', quelle riguardanti le authenticazioni e 
// quindi come tramite il nostro sito far registrare gli utenti e verificarli
// e poi per esempio c e firestore che e' la gestione di questi utenti nel db esterno




// qua sotto iniziamo con il setting dell autenticazione tramite popup
// il piu delle cose son da capire e copiare, nn dobbiam inventarci molto
// sotto e' un eventuale aggiunta dell autenticazione con redirect, molto semplice e uguale da settare

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
//export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);






// qua sotto passiamo alla creazione del database su firestore e all inserimento degli
// utenti che si registrano

export const db = getFirestore();



// inserimento utenti nell daytabase
export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
  if(!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

// al momwento dell autenticazione se l utente nn esiste nel db vogliam inserirlo,
// settando i dati dell userAuth 

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionalInfo,
      });
    } catch (error) {
       console.log('error creating the user', error.message);
    }
  }
// quando l utente e' nuovo lo registriamo, se no ritorniamo il suo docRef
return userDocRef;

};




// la seguente funzione e' per la creazione dell user con il metodo email e psw
// e' metodo built in e piuttosto semplice, ricevendo email e psw in ingresso ci crea l utente
// sotto con un altro semplice built in costruiamo il metodo per registrarci al sito
// con mail e psw che erano gia state registrate


export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};


export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};


export const signOutUser = async () => await signOut(auth);


export const onAuthStateChangedListener = (callback) => 
  onAuthStateChanged(auth, callback);

