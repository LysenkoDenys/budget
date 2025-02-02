'use client';

import { useState } from 'react';
import Portal from '../Portal/index';

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Open Modal
      </button>

      {isOpen && (
        <Portal>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded shadow-lg">
              <h2 className="text-xl font-bold">Hello from Portal!</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-3 p-2 bg-red-500 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

export default Modal;
