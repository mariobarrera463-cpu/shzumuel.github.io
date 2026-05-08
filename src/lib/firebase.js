import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove, getDocFromServer, increment } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Initialize user doc if it doesn't exist
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        displayName: user.displayName,
        photoURL: user.photoURL,
        favorites: [],
        lastPlayed: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
    return user;
  } catch (error) {
    // If user closed the popup or it was blocked, don't treat it as a critical system error
    if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request' || error.code === 'auth/popup-blocked') {
      console.log('Login cancelled or blocked by user/browser');
      return null;
    }
    handleFirestoreError(error, 'WRITE', 'users');
    throw error;
  }
};

export const logout = () => signOut(auth);

export const toggleFavorite = async (userId, gameId, isFavorite) => {
  const path = `users/${userId}`;
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      favorites: isFavorite ? arrayRemove(gameId) : arrayUnion(gameId),
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, 'UPDATE', path);
  }
};

export const addToLastPlayed = async (userId, gameId) => {
  const path = `users/${userId}`;
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      lastPlayed: arrayUnion(gameId),
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, 'UPDATE', path);
  }
};

export const updatePlayTime = async (userId, gameId, seconds) => {
  const path = `users/${userId}`;
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      [`playTime.${gameId}`]: increment(seconds),
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    handleFirestoreError(error, 'UPDATE', path);
  }
};

// Error handling as per instructions
export function handleFirestoreError(error, operationType, path) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Test connection
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if(error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
    // Note: We expect a "Missing or insufficient permissions" error here if rules are restrictive, 
    // which is fine as long as it's not a connection error.
  }
}
testConnection();
