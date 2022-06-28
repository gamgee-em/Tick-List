import './Home.css';
import { useState } from 'react';
import Auth from '../../utils/auth';

const Home = ({ RegisterForm, SignInForm }) => {
  //* if user revisits homepage while token is valid & rememberMe is true
  //* redirect to profile
  if (localStorage.getItem('remember_me') === 'true' && Auth.loggedIn()) {
    window.location.replace('/me');
  }

  const [formState, setFormState] = useState(true);

  const handleForm = (e) => {
    e.preventDefault();
    return !formState ? setFormState(true) : setFormState(false);
  };

  return (
    <main className='home-container'>
      {!formState ? (
        <SignInForm handleForm={handleForm} />
      ) : (
        <RegisterForm handleForm={handleForm} />
      )}
    </main>
  );
};

export default Home;
