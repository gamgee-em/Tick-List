import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_USER, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

import './Profile.css';

const Profile = ({ DataForm }) => {
    const { userID: userParam } = useParams();

    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { _id: userParam },
    });

    //! pass as prop to DataFrom component
    const user = data?.me || data?.user || {};

    if (Auth.loggedIn() && Auth.getProfile().data._id === userParam) {
        return <Navigate to='me' />;
    };

    if (loading) {
        return <div> Loading... </div>
    };

    if (!user?._id) {
        return (
            <h2>
                You need to be logged in to see this. Use the navigation links above to
                sign up or log in!
            </h2>
        );
    }

    return ( 
        <main className='profile-container'>
            <DataForm user={user} />
        </main>
     );
}
 
export default Profile;