import './TickList.css';

const TickList = ({ user }) => {

    if (!user.ticks.length) {
        return <h3> No Ticks Yet</h3>
    }

    return ( 
        <section className='tick-list-container'>
            <h3> Ticks </h3>
            <div className='tick-list-header'>
                <th className='route-name'> Route Name </th>
                <th className='difficulty'> Grade </th>
            </div>
            
            { user.ticks.map((tick, i) => {
                return(
                    <div className='tick-list' key={tick._id}> 
                        <div className='route-name'>{tick.route_name} </div>
                        <div className='difficulty'>{tick.difficulty} </div>
                    </div>)
                })
            }
        </section>
    );
}
 
export default TickList;