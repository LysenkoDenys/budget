'use client';

import { useState, useEffect } from 'react';
import Portal from '../Portal';
import { FormattedMessage, useIntl } from 'react-intl';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const FilterModal = ({ isOpen, onClose, onApplyFilter, currentFilters }) => {
  const [localFilters, setLocalFilters] = useState(currentFilters);
  const intl = useIntl();

  // Категорії з емодзі
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
          className="bg-white p-2 rounded shadow-lg dark:bg-gray-700 z-50 w-full max-w-md"
        >
          <h2 className="text-sm font-bold dark:text-white mb-4 text-center">
            <FormattedMessage id="filterModal.title" defaultMessage="Filters" />
          </h2>

          <div className="mb-3">
            <label className="block text-xs mb-1 dark:text-white">
              <FormattedMessage
                id="filterModal.dateFrom"
                defaultMessage="Date from:"
              />
            </label>
            <input
              type="date"
              value={localFilters.dateFrom || ''}
              onChange={(e) => handleInputChange('dateFrom', e.target.value)}
              className="w-full border rounded p-2 text-sm mb-2"
            />
            <label className="block text-xs mb-1 dark:text-white">
              <FormattedMessage
                id="filterModal.dateTo"
                defaultMessage="Date to:"
              />
            </label>
            <input
              type="date"
              value={localFilters.dateTo || ''}
              onChange={(e) => handleInputChange('dateTo', e.target.value)}
              className="w-full border rounded p-2 text-sm"
            />
          </div>

          <div className="mb-3">
            <label className="block text-xs mb-1 dark:text-white">
              <FormattedMessage
                id="filterModal.amountFrom"
                defaultMessage="Amount from:"
              />
            </label>
            <input
              type="number"
              value={localFilters.amountFrom || ''}
              onChange={(e) => handleInputChange('amountFrom', e.target.value)}
              className="w-full border rounded p-2 text-sm mb-2"
            />
            <label className="block text-xs mb-1 dark:text-white">
              <FormattedMessage
                id="filterModal.amountTo"
                defaultMessage="Amount to:"
              />
            </label>
            <input
              type="number"
              value={localFilters.amountTo || ''}
              onChange={(e) => handleInputChange('amountTo', e.target.value)}
              className="w-full border rounded p-2 text-sm"
            />
          </div>

          <div className="mb-3">
            <label className="block text-xs mb-1 dark:text-white">
              <FormattedMessage
                id="filterModal.category"
                defaultMessage="Category:"
              />
            </label>

            <Menu as="div" className="relative inline-block text-left w-full">
              <MenuButton className="inline-flex w-full gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900 ring-1 shadow-xs ring-gray-300 hover:bg-gray-50 shadow-lg dark:bg-gray-700 dark:text-gray-400 dark:hover:text-white">
                {localFilters.category || (
                  <FormattedMessage
                    id="form.selectCategory"
                    defaultMessage="Select category"
                  />
                )}
                <ChevronDownIcon
                  aria-hidden="true"
                  className="-mr-1 size-5 text-gray-400"
                />
              </MenuButton>

              <MenuItems className="absolute z-10 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gray-600 ring-1 shadow-lg ring-black/5 focus:outline-none max-h-60 overflow-y-auto">
                <div className="py-1"></div>
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
                            className={`w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-white ${
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
            <label className="block text-xs mb-1 dark:text-white">
              <FormattedMessage
                id="filterModal.comment"
                defaultMessage="Comment:"
              />
            </label>
            <input
              type="text"
              value={localFilters.comment || ''}
              onChange={(e) => handleInputChange('comment', e.target.value)}
              className="w-full border rounded p-2 text-sm"
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
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
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
