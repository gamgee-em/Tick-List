import './SignInForm.css';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

const SignInForm = ({ handleForm }) => {



    const [ userState, setUserState ] = useState({
        username: '',
        password: ''
    });

    const [ signInUser, { error, data } ] = useMutation(LOGIN_USER);

    const handleChange = (e) => {
        const { name, value } = e.target;
        return setUserState({ ...userState, [name]: value });
    };

    const signIn = async (e) => {
        e.preventDefault();
        try {
            const { data } = await signInUser({
                variables: { ...userState },
            });
            
            Auth.login(data.login.token)

        } catch (err) {
            console.error(err);
        }
        

        setUserState({
            username: '',
            password: ''
        });
    };

    return (
        <section>
            <form className='signin-form' onSubmit={signIn}>
                <h4> Sign In </h4>
                <button onClick={handleForm}> Register </button>
                <input 
                    className='username' 
                    name='username'
                    type='text'
                    placeholder='Username'
                    value={userState.username}
                    onChange={handleChange}
                />
                {/* <input 
                    className='email'
                    name='email' 
                    type='email'
                    placeholder='Email'
                    value={userState.email}
                    onChange={handleChange}
                /> */}
                <input 
                    className='password'
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={userState.password}
                    onChange={handleChange}
                />
                <button className='signin-btn' type='submit'> Submit </button>
            </form>
        </section>
        
     );
}
 
export default SignInForm;