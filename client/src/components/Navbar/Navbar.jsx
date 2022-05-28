import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

import './Navbar.css';

const Navbar = () => {

    const logout = () => Auth.logout();

    return ( 
        <nav>
            <h5> Tick List </h5>

            { Auth.loggedIn() ? (
                
                <Link to={'/'} onClick={logout}> Logout </Link>
                   
            ) : 
                <></>
            }
        </nav>
     );
};
 
export default Navbar;