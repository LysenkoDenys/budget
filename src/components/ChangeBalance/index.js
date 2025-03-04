import { useState } from 'react';
import Modal from '../Modal';

const ChangeBalance = ({ onSave }) => {
  const [isModalOpen, setModalOpen] = useState(false); // Стан для відкриття/закриття модального вікна

  const handleOpenModal = () => {
    setModalOpen(true); // Відкриває модальне вікно
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Закриває модальне вікно
  };

  return (
    <div>
      {/* Modal компонент з передачею необхідних пропсів */}
      <Modal
        onOpen={handleOpenModal}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={onSave}
      />
    </div>
  );
};

export default ChangeBalance;
