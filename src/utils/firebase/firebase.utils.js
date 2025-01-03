import { initializeApp } from 'firebase/app';
import { 
    getAuth,
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword 
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'



const firebaseConfig = {
    apiKey: "AIzaSyAkR6LIwcKP3UdxI8ZhI_165jLuxgeuX7E",
    authDomain: "luxurfit-clothing-db.firebaseapp.com",
    projectId: "luxurfit-clothing-db",
    storageBucket: "luxurfit-clothing-db.firebasestorage.app",
    messagingSenderId: "879848261185",
    appId: "1:879848261185:web:e0853388bfe9480b3d68c0"
  };
  
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
  
googleProvider.setCustomParameters({
    prompt: "select_account"
  });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const db = getFirestore();


export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {displayName: 'mike'}) => {
  try {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);    
    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try{
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation
        });
      } catch(error) {
        console.log('error creating the user', error.message)
      }
    }
      return userDocRef;}
     catch (error) {
      console.error('Error in createUserDocumentFromAuth:', error);

    }

};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};