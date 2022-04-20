import {React, useState, useContext} from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import './sign-up-form.styles.scss';
import FormInput from "../form-intput/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword:''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSumbit = async (event) => {
        event.preventDefault();

        if(confirmPassword !== password) {
            alert("pawsswords don't match")
            return
        };
        try{
            const {user} = await createAuthUserWithEmailAndPassword (email, password); 
            await createUserDocumentFromAuth(user, {displayName});
         
            resetFormFields();
        }
        catch(error){
            if (error.code === 'auth/email-already-in-use'){
                alert('Cannot create user, email already exists')
            }
            else {
                console.log(error);
            }
        }
    }

    return (
    <div className="sign-up">
        <h2>Don't have an account ?</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={handleSumbit}>
                <FormInput 
                    name="displayName" 
                    type="text" 
                    value={displayName} 
                    handleChange={handleChange}
                    label="Display Name"
                    required/>
                <FormInput 
                    name="email" 
                    type="email" 
                    value={email} 
                    handleChange={handleChange}
                    label="Email"
                    required/>
                <FormInput 
                    name="password" 
                    type="password" 
                    value={password} 
                    handleChange={handleChange}
                    label="Password"
                    required/>
                <FormInput 
                    name="confirmPassword" 
                    type="password" 
                    value={confirmPassword} 
                    handleChange={handleChange}
                    label="Confirm Password"
                    required/>
                
            <CustomButton type="submit">Sign Up</CustomButton>
        </form>
    </div>
  );
}
export default SignUpForm;