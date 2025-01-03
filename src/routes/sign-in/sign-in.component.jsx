import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils.js'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
   const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        createUserDocumentFromAuth(user);
    };

    return(
    <div>
        <h1>Sign In Page</h1>
        <button onClick={logGoogleUser}>
            Sign In with Google Popup
        </button>
        <SignUpForm />
    </div>
    )
}

export default SignIn;