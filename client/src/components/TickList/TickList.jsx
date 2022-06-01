import './TickList.css';

const TickList = ({ user }) => {

    return (

        !user.ticks.length ? (
            <section className='tick-list-container'>
                <h3> No Ticks Yet</h3>
            </section>
            ) : ( 
            <section className='tick-list-container'>
                <h3> Ticks </h3>
                <div className='tick-list-header'>
                    <th className='route-name'> Route Name </th>
                    <th className='difficulty'> Grade </th>
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
        )
    );
};
 
export default TickList;