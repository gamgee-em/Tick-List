import './DetailsModal.css';
//import { useMutation } from '@apollo/client';
//import { UPDATE_TICK } from '../../utils/mutations';

//! STARTING POINT - use mutation hook UPDATE_USER

const DetailsModal = ({ showDetails, setShowDetails }) => {
 /*  const [updateTick, { error }] = useMutation(UPDATE_TICK);

  const modifyTick = (e) => {
    e.preventDefault();

    try {

    } catch (error) {

    }

  }; */

  return (
    <div className='detail-container'>
        <span className="exit-detail" onClick={()=>setShowDetails(!showDetails)}> X </span>
      <h4 className='detail-title'> Details </h4>
    </div>
  );
};

export default DetailsModal;
