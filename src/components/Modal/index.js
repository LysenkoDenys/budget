'use client';
import { useEffect, useState } from 'react';
import Portal from '../Portal/index';
import Form from '../Form';
import { FormattedMessage, useIntl } from 'react-intl';

const Modal = ({ onSave, editData, onEdit, isOpen, onClose }) => {
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
    isOpen && (
      <Portal>
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-2 rounded shadow-lg dark:bg-gray-500 z-50 max-w-60"
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
    )
  );
};

export default Modal;
