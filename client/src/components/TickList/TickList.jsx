import { useMutation } from '@apollo/client';
import { DELETE_TICK } from '../../utils/mutations';
import './TickList.css';

const TickList = ({ user }) => {

    const [ deleteTick, { error } ] = useMutation(DELETE_TICK);

    console.log('Delete Tick: ',deleteTick);

    //! STARTING POINT
    //* pass in user id & tick id onCLick
    const removeTick = async (e) => {
        e.preventDefault();

        try {
            const { data } = await deleteTick({
                variables: {
                    
                }
            })
        } catch(error) {
            console.error(error);
        }

    };

    return (
            <section className='tick-list-container'>
                <h3> Ticks </h3>
                <div className='tick-list-header'>
                    <th className='route-title'> Route Name </th>
                    <th className='difficulty-title'> Grade </th>
                </div>
                
                { user.ticks.map(tick => {
                    return (
                        <div className='tick-list' key={tick._id}> 
                            <div className='route-name'>{tick.route_name} </div>
                            <div className='difficulty'>v{tick.difficulty} </div>
                        </div>
                    )
                })}
            </section>
        );
};
 
export default TickList;