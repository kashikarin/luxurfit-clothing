import { useState } from 'react';
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils.js';
import FormInput from '../form-input/form-input.component';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';
import {SignUpContainer, ButtonsContainer} from './sign-in-form.styles';
import {useDispatch} from 'react-redux';
import {googleSignInStart, emailSignInStart} from '../../store/user/user.action';

const defaultSignInFields = {
    email: '',
    password: ''
};

const SignInForm = () => {
    const dispatch = useDispatch();
    const [signInFields, setSignInFields] = useState(defaultSignInFields);
    const { email, password } = signInFields;
    
    const signInWithGoogle = () => {
        dispatch(googleSignInStart());
    };

    const resetSignInFields = () => {
        setSignInFields(defaultSignInFields);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSignInFields({...signInFields, [name]: value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            dispatch(emailSignInStart(email, password));
            resetSignInFields();
        } catch(error){
            switch(error.code) {
                case 'auth/invalid-credential':
                    alert('incorrect password or email');
                    break;
                default: 
                    console.log(error);
            }
        }
        }

    return(
        <SignUpContainer>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>       
                <FormInput 
                    label="Email" 
                    inputOptions={{
                        type: 'text', 
                        name: 'email', 
                        value: email,
                        onChange: handleChange, 
                        required: true
                    }}/>
                <FormInput 
                    label="Password" 
                    inputOptions={{
                        type: 'password', 
                        name: 'password',
                        value: password, 
                        onChange: handleChange,
                        required: true
                    }}/>
                <ButtonsContainer>
                    <Button type='submit'>
                        Sign In
                    </Button>
                    <Button onClick={signInWithGoogle} buttonType={BUTTON_TYPE_CLASSES.google} type='button'>
                        Google Sign In
                    </Button>
                </ButtonsContainer>
                
            </form>
        </SignUpContainer>
    )
}
export default SignInForm;