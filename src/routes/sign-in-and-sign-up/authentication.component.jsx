import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form copy/sign-in-form.component";

import "./authetication.scss"
const Authentication = () => {


    return (
        <div className="authentication">
            <SignInForm/>
            <SignUpForm/>
        </div>
    );
}
export default Authentication;