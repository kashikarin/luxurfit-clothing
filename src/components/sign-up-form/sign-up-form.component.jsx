import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component';
import {Signup} from './sign-up-form.styles';
import Button from '../button/button.component';
import {useDispatch} from 'react-redux';
import {signUpStart} from '../../store/user/user.action';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {
    const dispatch = useDispatch();

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;
            
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value})

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
          alert('passwords do not match');
          return;
        }
        try{
            dispatch(signUpStart(email, password,displayName));
            resetFormFields();
        } catch(error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('cannot create user, email already in use');
            }
            console.log('error creating the user', error.message);
        }
    }

    return(
        <Signup>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}> 
                <FormInput 
                    label="Display Name" 
                    inputOptions={{
                        type: 'text', 
                        name: 'displayName', 
                        value: displayName, 
                        onChange: handleChange, 
                        required: true
                    }}/>                
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
                <FormInput 
                    label="Confirm Password" 
                    inputOptions={{
                        type: 'password', 
                        name: 'confirmPassword', 
                        value: confirmPassword, 
                        onChange: handleChange, 
                        required: true
                    }}/> 
                <Button type='submit'>
                    Sign Up
                </Button>
            </form>
        </Signup>
    )
}

export default SignUpForm;