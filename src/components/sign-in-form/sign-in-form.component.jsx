import { useState } from 'react';
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils.js';
import {  } from '../../utils/firebase/firebase.utils.js'

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-in-form.styles.scss';

const defaultSignInFields = {
    email: '',
    password: ''
};



const SignInForm = () => {
    const [signInFields, setSignInFields] = useState(defaultSignInFields);
    const { email, password } = signInFields;
    
    console.log(signInFields);
    
    const signInWithGoogle = async () => {
        const user = await signInWithGooglePopup();
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
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
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
        <div className='sign-up-container'>
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
                <div className='buttons-container'>
                    <Button type='submit'>
                        Sign In
                    </Button>
                    <Button onClick={signInWithGoogle} buttonType='google' type='button'>
                        Google Sign In
                    </Button>
                </div>
                
            </form>
        </div>
    )
}
export default SignInForm;