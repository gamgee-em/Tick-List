import './TickList.css';

const TickList = ({ user }) => {

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
        )
    /* ); */
};
 
export default TickList;