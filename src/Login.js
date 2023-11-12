import React, { useState } from 'react';
import './Login.css'
import { useNavigate } from "react-router-dom";
// import StorefrontIcon from '@mui/icons-material/Storefront';
import { auth } from "./firebase";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





function Login() {
    // const auth = getAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = async (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            toast.error("Email or Password is Required", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            return;
        }
    
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Signed in
            if (userCredential) {

                toast.success("Sucessfully Login")
                navigate("/");
            }
           
        } catch (error) {
            // const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage.email);
           
                toast.error("Email or Password already in use", {
                    position: toast.POSITION.BOTTOM_RIGHT
                  });
            
          
        }
    }
    
    const signIn = async (e) => {
        e.preventDefault();
        // console.log(e);

        if (email === "" || password === "") {
            toast.error("Email or Password is Empty", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            return;
        }
    
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            if (user) {
                toast.success("Successfully Logged In!", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
    
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }
        } catch (error) {
            toast.error("Email or Password is Incorrect", {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    }

    // const register = e => {
    //     e.preventDefault();

    //     auth
    //         .createUserWithEmailAndPassword(email, password)
    //         .then((auth) => {
    //             if (auth) {
    //                 history.push('/');
    //             }
    //         })
    //         .catch(error => alert(error.message))

    // }

    return (
        <div className='login'> 
            <ToastContainer />

            <div className='login__container'>
                <h1>Sign-in</h1>

                <form>
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button type='submit' className='login__signInButton' onClick={signIn}>Sign In</button>
                </form>

                <p>
                    By signing-in you agree to the eShop Website Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button className='login__registerButton' onClick={register}>Create your Amazon Account</button>
            </div>
        </div>
    )
}

export default Login;