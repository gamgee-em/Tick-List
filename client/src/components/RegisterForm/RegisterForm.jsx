import './RegisterForm.css';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

const RegisterForm = () => {

    const [ userState, setUserState ] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [ createUser, { error } ] = useMutation(ADD_USER);

    const handleChange = (e) => {
        const { name, value } = e.target;
        return setUserState({ ...userState, [name]: value });
    };

    const addUser = async (e) => {
        e.preventDefault();
        try{
            const { data } = await createUser({
                variables: { ...userState },
            });
            
            Auth.login(data.addUser.token)

        } catch (err) {
            console.error(err);
        }
        

        setUserState({
            username: '',
            email: '',
            password: ''
        });
    };

    return (
        <section>
            <form className='register-form' onSubmit={addUser}>
                <h4> Register </h4>
                <input 
                    className='username' 
                    name='username'
                    type='text'
                    placeholder='Username'
                    value={userState.username}
                    onChange={handleChange}
                />
                <input 
                    className='email'
                    name='email' 
                    type='email'
                    placeholder='Email'
                    value={userState.email}
                    onChange={handleChange}
                />
                <input 
                    className='password'
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={userState.password}
                    onChange={handleChange}
                />
                <button className='register-btn' type='submit'> Submit </button>
            </form>
        </section>
        
     );
}
 
export default RegisterForm;