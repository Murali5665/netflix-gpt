import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "./firebase";

export const validateCreds = (email, password) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/; // Example: Minimum eight characters, at least one letter and one number
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = passwordRegex.test(password);

    if (!isEmailValid || !isPasswordValid) {
        return { message: "Email and password are required" };
    }

    if (!isEmailValid) {
        return { message: "Invalid email format." };
    }
    if (!isPasswordValid) {
        return { message: "Password must be at least 8 characters long and contain at least one letter and one number." };
    }

    return { message: null };
}

export const userSignUp = async (userName, email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(auth.currentUser, { displayName: userName });
        await auth.currentUser.reload();
        return { message: null };
    } catch (error) {
        return { message: error.message };
    }
}

export const userLogin = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return { message: null };
    } catch (error) {
        return { message: error.message };
    }
};

export const handleSignOut = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}


