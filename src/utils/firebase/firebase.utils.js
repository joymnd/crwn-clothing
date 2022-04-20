import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithRedirect,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
}from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC5V_3dh3653sYh4rCHaTic5bum0SFolSQ",
  authDomain: "crwn-db-2f28e.firebaseapp.com",
  projectId: "crwn-db-2f28e",
  storageBucket: "crwn-db-2f28e.appspot.com",
  messagingSenderId: "930744749919",
  appId: "1:930744749919:web:3d9f4ea70e295e02bb30ea"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt:"select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);
export const db = getFirestore(firebaseApp);

export const createUserDocumentFromAuth = async(userAuth, additionalInfo) => {
    if(!userAuth) return; 

    const userDocRef = doc(db,'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            });
        }
        catch(error){
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
} 

export const createAuthUserWithEmailAndPassword = async(email,password) => {
    if(!email || !password) return; 

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async(email,password) => {
    if(!email || !password) return; 

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async() => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback );
}