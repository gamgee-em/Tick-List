import './RegisterForm.css';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

const RegisterForm = ({ handleForm }) => {

    const [ userState, setUserState ] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [ addUser, /* { error } */ ] = useMutation(ADD_USER);

    const handleChange = (e) => {
        const { name, value } = e.target;
        return setUserState({ ...userState, [name]: value });
    };

    const createUser = async (e) => {
        e.preventDefault();
        try {
            const { data } = await addUser({
                variables: { ...userState },
            });
            
            console.log('CreateUser Data: ', data);
            Auth.login(data.addUser.token)

        } catch (err) {
            console.error(err);
        };
        

        setUserState({
            username: '',
            email: '',
            password: ''
        });
    };

    return (
        <section className='register'>
             <img src='/images/tick_list.png' alt='mountain icon' />
            <form className='register-form' onSubmit={createUser}>
                <h4> Register Here. </h4>
                <p> Nows a good a time as any! </p>
                <input 
                    className='username' 
                    name='username'
                    type='text'
                    autoComplete='on'
                    placeholder='Username'
                    value={userState.username}
                    onChange={handleChange}
                />
                <input 
                    className='email'
                    name='email' 
                    type='email'
                    autoComplete='on'
                    placeholder='Email'
                    value={userState.email}
                    onChange={handleChange}
                />
                <input 
                    className='password'
                    name='password'
                    type='password'
                    autoComplete='on'
                    placeholder='Password'
                    value={userState.password}
                    onChange={handleChange}
                />
                <button className='register-btn' type='submit'> Submit </button>
                <p> Already registered? <span className='toggle-register' onClick={handleForm}> Sign in here </span></p>
            </form>
        </section>
     );
};
 
export default RegisterForm;
