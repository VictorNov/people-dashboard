import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    UserCredential,
} from "firebase/auth";

export const createUser = async (
    email: string,
    password: string
) : Promise<UserCredential | { errorCode: string, errorMessage: string }> => {
    const auth = getAuth();
    const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
    )
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return { errorCode, errorMessage };
        });

    return credentials;
}

export const signInUser = async (
    email: string,
    password: string
): Promise<UserCredential | { errorCode: string, errorMessage: string }> => {
    const auth = getAuth();
    const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password,
    )
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return { errorCode, errorMessage };
        });

    return credentials;
}

export const initUser = async () => {
    const auth = getAuth();
    const firebaseUser = useFirebaseUser();
    firebaseUser.value = auth.currentUser;
    onAuthStateChanged(auth, (user) => {
        firebaseUser.value = user;
        if (user) {
            navigateTo('/');
        } else {
            navigateTo('/login');
        }
    });
}

export const signOutUser = async () => {
    const auth = getAuth();
    const result = await auth.signOut()
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
        });

    return result;
}
