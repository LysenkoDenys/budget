import React, { useRef, useMemo, useState } from 'react';
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import Transaction from '../Transaction';
import Modal from '../Modal';
import { useModal } from '../../hooks';
import Spinner from '../Spinner';

const Transactions = ({
  data = [],
  loadMoreRows,
  onDelete,
  onEdit,
  onStarClick,
  isNextPageLoading,
  hasNextPage,
  onAddTransaction,
}) => {
  const listRef = useRef(null);
  const itemSizeMap = useRef({});

  // Modal State
  const { isModalOpen, openModal, closeModal } = useModal();
  const [editData, setEditData] = useState(null);

  // Open modal for adding a new transaction
  const handleOpenModal = (transaction) => {
    setEditData(transaction);
    openModal();
  };

  // Open modal for editing an existing transaction
  const handleEditTransaction = (transaction) => {
    setEditData(transaction);
    openModal();
  };

  // Close modal
  const handleCloseModal = () => {
    closeModal();
    setEditData(null);
  };

  // Sorting transactions by date (descending)
  const sortedData = useMemo(() => {
    if (!data || data.length === 0) return [];
    return [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [data]);

  const getItemSize = (index) => itemSizeMap.current[index] || 60;
  const setItemSize = (index, size) => {
    if (itemSizeMap.current[index] !== size) {
      itemSizeMap.current[index] = size;
      listRef.current?.resetAfterIndex(index);
    }
  };

  const isItemLoaded = (index) => !!data[index];
  const loadMoreItems = isNextPageLoading
    ? () => {}
    : async () => {
        if (!navigator.onLine) {
          console.warn('No internet connection');
          return;
        }
        try {
          await loadMoreRows();
        } catch (error) {
          console.error('Failed to load more rows:', error.message);
        }
      };

  const itemCount = hasNextPage ? data.length + 1 : data.length;

  return (
    <div className="w-full h-screen min-h-screen sm:min-h-[300px] md:min-h-[calc(100vh-127px)]">
      {/* Show offline warning */}
      {/* {!navigator.onLine && (
        <div className="fixed top-0 left-0 right-0 bg-yellow-300 text-center p-1">
          You are offline. Some features may be unavailable.
        </div>
      )} */}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editData={editData}
        onEdit={onEdit}
        onSave={onAddTransaction}
      />

      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={itemCount}
            loadMoreItems={loadMoreItems}
          >
            {({ onItemsRendered, ref: infiniteRef }) => (
              <List
                key={`list-${data.length}`}
                ref={(node) => {
                  listRef.current = node;
                  infiniteRef(node);
                }}
                height={height}
                width={width}
                itemCount={itemCount}
                itemSize={getItemSize}
                estimatedItemSize={120}
                onItemsRendered={onItemsRendered}
                itemData={sortedData}
              >
                {({ index, style }) => {
                  const transaction = sortedData[index];
                  if (!transaction && hasNextPage) {
                    return <Spinner />;
                  }
                  return transaction ? (
                    <div style={{ ...style, minWidth: '100%' }}>
                      <Transaction
                        transaction={transaction}
                        onDelete={onDelete}
                        onEdit={handleEditTransaction}
                        onStarClick={onStarClick}
                        setItemSize={(size) => setItemSize(index, size)}
                      />
                    </div>
                  ) : null;
                }}
              </List>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>
    </div>
  );
};

export default Transactions;
