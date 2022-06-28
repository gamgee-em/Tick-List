import './DetailsModal.css';
import { useMutation } from '@apollo/client';
import { UPDATE_TICK } from '../../utils/mutations';

//! STARTING POINT - use mutation hook UPDATE_USER

const DetailsModal = () => {
  const [updateTick, { error }] = useMutation(UPDATE_TICK);

  const modifyTick = () => {
    e.preventDefault();
    try {
    } catch (error) {}
  };

  return (
    <div>
      <h3> Details </h3>
    </div>
  );
};

export default DetailsModal;
