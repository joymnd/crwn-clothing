import {React, useState} from "react";
import { signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import './sign-in-form.styles.scss';
import FormInput from "../form-intput/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const signInWithGoogle = async()=>{
        await signInWithGooglePopup();  
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSumbit = async (event) => {
        event.preventDefault();

        try{
            await signInAuthUserWithEmailAndPassword(
                email,
                password
            );
          
            resetFormFields();
        }
        catch(error){
            switch(error.code){
                case "auth/wrong-password": 
                    alert("Incorrect password");
                    break;
                case "auth/user-not-found": 
                    alert ("No user found");
                    break;
                default: 
                    console.log(error);
            }
        }
    }

    return (
    <div className="sign-up">
        <h2>Already have an account?</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={handleSumbit}>
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
            <div className="button-container"> 
                <CustomButton type="submit">Sign In</CustomButton>
                <CustomButton type="button" onClick={signInWithGoogle}>Google Sign In</CustomButton>
            </div>
        </form>
    </div>
  );
}
export default SignInForm;