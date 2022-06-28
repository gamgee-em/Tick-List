import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { DELETE_TICK } from '../../utils/mutations';
import './TickList.css';
import { capFirstChar } from '../../utils/helpers';

const TickList = ({ user }) => {
  const [deleteTick /* , { error }  */] = useMutation(DELETE_TICK);

  const removeTick = async (_id) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) return false;

    try {
      const { data } = await deleteTick({
        variables: { _id },
      });
      console.log('Data: ', data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className='tick-list-container'>
      <h3>Ticks</h3>
      <div className='tick-list-header'>
        <th className='route-title'> Route </th>
        <th className='difficulty-title'> Grade </th>
      </div>

      {user.ticks.map((tick) => {
        return (
          <div className='tick-list' key={tick._id}>
            <div className='route-name'>{capFirstChar(tick.route_name)} </div>
            <button
              className='update-tick' /* onClick={() => removeTick(tick._id)} */
            >
              {' '}
              Update{' '}
            </button>
            <button
              className='remove-tick'
              onClick={() => removeTick(tick._id)}
            >
              {' '}
              Delete{' '}
            </button>
            <div className='difficulty'>v{tick.difficulty} </div>
          </div>
        );
      })}
    </section>
  );
};

export default TickList;
