'use client';
import { useEffect, useState } from 'react';
import Portal from '../Portal/index';
import Form from '../Form';
import { FormattedMessage, useIntl } from 'react-intl';

const Modal = ({ onSave, editData, onEdit, isOpen, onOpen, onClose }) => {
  const intl = useIntl();
  const isEditing = !!editData;

  const handleSave = (data) => {
    if (isEditing) {
      onEdit(editData.id, data);
    } else if (onSave) {
      onSave(data);
    }

    onClose();
  };

  return (
    <>
      {!isEditing && (
        <button
          onClick={onOpen}
          className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 text-white 
          rounded-full fixed bottom-8 right-8 text-3xl shadow-xl flex items-center justify-center 
          transition-all duration-300 transform hover:scale-110 hover:shadow-2xl 
          active:scale-95 active:shadow-md dark:opacity-70 z-10"
        >
          +
        </button>
      )}

      {isOpen && (
        <Portal>
          <div
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-2 rounded shadow-lg dark:bg-gray-500 z-50"
            >
              <div className="flex justify-between items-center mb-2 mx-1">
                <h2 className="text-md font-bold dark:text-white">
                  {isEditing ? (
                    <FormattedMessage id="form.editCaption" />
                  ) : (
                    <FormattedMessage id="form.addCaption" />
                  )}
                </h2>
                <button
                  onClick={onClose}
                  className="px-2 bg-red-500 text-white rounded"
                >
                  x
                </button>
              </div>
              <Form
                initialData={editData}
                onSave={handleSave}
                onClose={onClose}
              />
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

export default Modal;
