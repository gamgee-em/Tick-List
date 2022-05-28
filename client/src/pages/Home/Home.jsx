import './Home.css';
import Auth from '../../utils/auth';
import { useState } from 'react';

const Home = ({ RegisterForm, SignInForm }) => {

    const [ formState, setFormState ] = useState(false);

    const handleForm = (e) => {
        e.preventDefault();
        return !formState ? setFormState(true) : setFormState(false);
    }

    return ( 
        <main className='home-container'>
            { !formState ? (
                <SignInForm handleForm={handleForm} />
            ) : (
                <RegisterForm handleForm={handleForm} />
                )
            }
            
        </main>
     );
}
 
export default Home;