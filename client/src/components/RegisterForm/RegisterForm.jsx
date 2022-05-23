import './RegisterForm.css';

const RegisterForm = () => {

    

    const handleChange = () => {

    };

    return (
        <section>
            <form className='register-form'>
                <h4> Register </h4>
                <input 
                    className='username' 
                    type="text" 
                    placeholder='Username'
                />
                <input 
                    className='email' 
                    type="email" 
                    placeholder='Email'
                />
                <input 
                    className='password' 
                    type="password" 
                    placeholder='Password'
                />
                <button className='register-btn'> Submit </button>
            </form>
        </section>
        
     );
}
 
export default RegisterForm;