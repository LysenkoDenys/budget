'use client';

import { useState, useEffect } from 'react';
import Portal from '../Portal';
import { FormattedMessage, useIntl } from 'react-intl';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const FilterModal = ({ isOpen, onClose, onApplyFilter, currentFilters }) => {
  const [localFilters, setLocalFilters] = useState(currentFilters);
  const intl = useIntl();

  const categories = [
    { key: 'income', emoji: '💰' },
    { key: 'food', emoji: '🥝' },
    { key: 'transportation', emoji: '🚍' },
    { key: 'utility', emoji: '💡' },
    { key: 'communication', emoji: '📱' },
    { key: 'children', emoji: '⚽' },
    { key: 'health', emoji: '⚕️' },
    { key: 'new_things', emoji: '💎' },
    { key: 'holidays', emoji: '🎁' },
    { key: 'repairs', emoji: '🛠️' },
    { key: 'other', emoji: '🎱' },
  ];

  useEffect(() => {
    setLocalFilters(currentFilters);
  }, [currentFilters]);

  const handleInputChange = (field, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleApply = () => {
    onApplyFilter(localFilters);
    onClose();
  };

  const handleReset = () => {
    setLocalFilters({
      dateFrom: '',
      dateTo: '',
      amountFrom: '',
      amountTo: '',
      category: '',
      comment: '',
    });
  };

  if (!isOpen) return null;

  return (
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
              {intl.formatMessage({ id: 'filterModal.caption' })}
            </h2>
            <button
              onClick={onClose}
              className="px-2 bg-red-500 text-white rounded"
            >
              x
            </button>
          </div>
          <div className="mb-3">
            <input
              type="date"
              value={localFilters.dateFrom || ''}
              onChange={(e) => handleInputChange('dateFrom', e.target.value)}
              className="w-full p-1 text-lg text-gray-400 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 shadow-lg appearance-none mb-1"
            />
            <input
              type="date"
              value={localFilters.dateTo || ''}
              onChange={(e) => handleInputChange('dateTo', e.target.value)}
              className="w-full p-1 text-lg text-gray-400 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 shadow-lg appearance-none"
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              value={localFilters.amountFrom || ''}
              placeholder={intl.formatMessage({ id: 'filterModal.amountFrom' })}
              onChange={(e) => handleInputChange('amountFrom', e.target.value)}
              className="w-full p-1 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white shadow-lg appearance-none mb-1"
            />
            <input
              type="number"
              value={localFilters.amountTo || ''}
              placeholder={intl.formatMessage({ id: 'filterModal.amountTo' })}
              onChange={(e) => handleInputChange('amountTo', e.target.value)}
              className="w-full p-1 text-lg text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white shadow-lg appearance-none"
            />
          </div>

          <div className="mb-3">
            <Menu as="div" className="relative inline-block text-left w-full">
              <MenuButton
                className={`inline-flex w-full gap-x-1.5 rounded-md p-1 text-lg font-semibold shadow-xs ring-gray-300 hover:bg-gray-50 hover:text-gray-900 dark:hover:text-white shadow-lg dark:bg-gray-700 ${
                  localFilters.category
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-400 dark:text-gray-400'
                }`}
              >
                {localFilters.category ||
                  intl.formatMessage({ id: 'filterModal.category' })}
                <ChevronDownIcon
                  aria-hidden="true"
                  className="-mr-1 size-5 text-gray-400"
                />
              </MenuButton>

              <MenuItems className="absolute right-0 z-10 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gray-500 ring-1 shadow-lg ring-black/5 focus:outline-hidden max-h-48 overflow-y-auto">
                {[
                  'income',
                  'food',
                  'transportation',
                  'utility',
                  'communication',
                  'children',
                  'health',
                  'new_things',
                  'holidays',
                  'repairs',
                  'other',
                ].map((categoryKey) => {
                  const label = intl.formatMessage({
                    id: `form.${categoryKey}`,
                  });
                  const emojiMap = {
                    income: '💰',
                    food: '🥝',
                    transportation: '🚍',
                    utility: '💡',
                    communication: '📱',
                    children: '⚽',
                    health: '⚕️',
                    new_things: '💎',
                    holidays: '🎁',
                    repairs: '🛠️',
                    other: '🎱',
                  };
                  return (
                    <div key={categoryKey} className="py-1">
                      <MenuItem>
                        {({ active }) => (
                          <button
                            type="button"
                            onClick={() => handleInputChange('category', label)}
                            className={`w-full flex items-center gap-2 px-4 py-0 text-sm text-gray-700 dark:text-white ${
                              active
                                ? 'bg-gray-100 text-gray-900 dark:bg-gray-500'
                                : ''
                            } ${
                              categoryKey === 'income'
                                ? 'bg-green-200 dark:bg-green-700'
                                : ''
                            }`}
                          >
                            <span>{emojiMap[categoryKey]}</span>
                            <span>{label}</span>
                          </button>
                        )}
                      </MenuItem>
                    </div>
                  );
                })}
              </MenuItems>
            </Menu>
          </div>

          <div className="mb-4">
            <input
              type="text"
              value={localFilters.comment || ''}
              placeholder={intl.formatMessage({ id: 'filterModal.comment' })}
              onChange={(e) => handleInputChange('comment', e.target.value)}
              className="w-full p-1 text-lg font-semibold  text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white shadow-lg appearance-none"
            />
          </div>

          <div className="flex justify-center gap-2">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
            >
              <FormattedMessage id="filterModal.reset" defaultMessage="Reset" />
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
            >
              <FormattedMessage
                id="filterModal.cancel"
                defaultMessage="Cancel"
              />
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
              <FormattedMessage id="filterModal.apply" defaultMessage="Apply" />
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default FilterModal;
