import { initializeApp } from 'firebase/app';
import { 
    getAuth,
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
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

const provider = new GoogleAuthProvider();
  
provider.setCustomParameters({
    prompt: "select_account"
  });

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();


export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());
    
    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try{
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        });
      } catch(error) {
        console.log('error creating the user', error.message)
      }
      return userDocRef;
    }
    //if user data exists

    //return back userDocRef

    // is user data doesn ot exist - create/ set document with the data from userAuth in my collection (with the user snapshot) 

};