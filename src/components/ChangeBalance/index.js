import { useModal } from '../../hooks';
import Modal from '../Modal';

const ChangeBalance = ({ onSave }) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  return <Modal isOpen={isModalOpen} onClose={closeModal} onSave={onSave} />;
};

export default ChangeBalance;
