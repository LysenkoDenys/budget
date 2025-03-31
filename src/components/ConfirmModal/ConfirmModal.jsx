'use client';
import Portal from '../Portal';
import { FormattedMessage } from 'react-intl';

const ConfirmModal = ({ isOpen, onClose, onConfirm, caption }) => {
  if (!isOpen) return null;

  return (
    <Portal>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white p-2 rounded shadow-lg dark:bg-gray-700 z-50"
        >
          <h2 className="text-sm font-bold dark:text-white mb-2 text-center">
            <FormattedMessage
              id={caption ? `confirmModal.${caption}` : 'confirmModal.caption'}
            />
          </h2>
          <div className="flex justify-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              <FormattedMessage id="confirmModal.cancel" />
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            >
              <FormattedMessage id="confirmModal.delete" />
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default ConfirmModal;
