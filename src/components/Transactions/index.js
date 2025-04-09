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
  filters,
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

  // Sorting transactions by date (descending) + filtering:
  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // console.log('Original Data:', data);
    // console.log('Current Filters:', filtres);

    let filtered = [...data];

    if (filters.starOnly) {
      filtered = filtered.filter((item) => item.isStarred);
    }

    // Додати захист, щоб переконатися, що dateRange існує перед використанням
    if (filters.dateRange && filters.dateRange.from && filtres.dateRange.to) {
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.date).getTime();
        return (
          itemDate >= new Date(filters.dateRange.from).getTime() &&
          itemDate <= new Date(filters.dateRange.to).getTime()
        );
      });
    }

    if (filters.category) {
      filtered = filtered.filter((item) => item.category === filtres.category);
    }

    if (filters.amountRange?.min != null && filters.amountRange?.max != null) {
      filtered = filtered.filter(
        (item) =>
          item.amount >= filters.amountRange.min &&
          item.amount <= filters.amountRange.max
      );
    }

    if (filters.comment) {
      filtered = filtered.filter((item) =>
        item.comment.toLowerCase().includes(filters.comment.toLowerCase())
      );
    }

    return filtered.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [data, filters]);

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
                itemData={filteredData}
              >
                {({ index, style }) => {
                  const transaction = filteredData[index];
                  if (!transaction && hasNextPage && navigator.onLine) {
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
