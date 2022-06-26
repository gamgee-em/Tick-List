import './ToggleBtn.css';

const ToggleBtn = () => {

    return ( 
        <div className='toggle-container'>
            <h6> Remember Me? </h6>
            <div className='toggle'>
                <input type='checkbox' className='toggle-btn'/>
                <span className='circle'> </span>
            </div>
        </div>
    );

};
 
export default ToggleBtn;