import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

import './Navbar.css';

const Navbar = () => {

    const logout = () => Auth.logout();

    return ( 
        <nav id='nav-container'>
            <h5 id='logo'> Tick List </h5>
            { Auth.loggedIn() && ( 
                <Link
                    id='logout'
                    to={'/'} 
                    onClick={logout}
                > 
                    Logout 
                </Link>  
            )}
        </nav>
     );
};
 
export default Navbar;