'use client';

import { useState } from 'react';
import Portal from '../Portal/index';
import Form from '../Form';
import { FormattedMessage, useIntl } from 'react-intl';

const Modal = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  const intl = useIntl();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 text-white 
             rounded-full fixed top-16 right-2 text-3xl shadow-xl flex items-center justify-center 
             transition-all duration-300 transform hover:scale-110 hover:shadow-2xl 
             active:scale-95 active:shadow-md opacity-30 dark:opacity-80"
      >
        +
      </button>

      {isOpen && (
        <Portal>
          <div
            onClick={closeModal}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-2 rounded shadow-lg dark:bg-gray-500"
            >
              <div className="flex justify-between items-center mb-2 mx-1">
                <h2 className="text-md font-bold dark:text-white">
                  <FormattedMessage id="form.caption" />
                </h2>
                <button
                  onClick={closeModal}
                  className="px-2 bg-red-500 text-white rounded"
                >
                  x
                </button>
              </div>
              <Form onChange={onChange} onClick={closeModal} />
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

export default Modal;
