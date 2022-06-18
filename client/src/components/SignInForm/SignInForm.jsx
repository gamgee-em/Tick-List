import './SignInForm.css';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNIN_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

const SignInForm = ({ handleForm }) => {

    const [ userState, setUserState ] = useState({
        username: '',
        password: ''
    });

    const [ signInUser/* , { error } */ ] = useMutation(SIGNIN_USER);

    const handleChange = (e) => {
        const { name, value } = e.target;
        return setUserState({ ...userState, [name]: value});
    };

    const signIn = async (e) => {
        e.preventDefault();
        try {
            const { data } = await signInUser({
                variables: { ...userState },
            });

            console.log('SignIn Data: ', data);

            Auth.login(data.signInUser.token);

        } catch (err) {
            console.error(err);
        };

        setUserState({
            username: '',
            password: ''
        });
    };

    return (
        <section className='signin'>
            <img src='/images/tick_list.png' alt='mountain icon' />
            <form className='signin-form' onSubmit={signIn}>
                <h4> Welcome Back! </h4>
                <p> Ready to add some ticks?</p>
                <input 
                    className='username' 
                    name='username'
                    autoComplete="on"
                    type='text'
                    placeholder='Username'
                    value={userState.username}
                    onChange={handleChange}
                />
                <input 
                    className='password'
                    name='password'
                    autoComplete='on'
                    type='password'
                    placeholder='Password'
                    value={userState.password}
                    onChange={handleChange}
                />
                <button className='signin-btn' type='submit'> Submit </button>
                <p> First time? <span className='toggle-signin' onClick={handleForm} > Register here </span></p>
            </form>
        </section>
        
     );
};
 
export default SignInForm;
