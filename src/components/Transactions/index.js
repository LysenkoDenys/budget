import React, { useRef, useMemo } from 'react';
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import Transaction from '../Transaction';

const Transactions = ({
  data = [],
  loadMoreRows,
  onDelete,
  onStarClick,
  isNextPageLoading,
  hasNextPage,
}) => {
  const listRef = useRef(null);
  const itemSizeMap = useRef({});

  // Sort transactions by date (descending)
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
    <div className="w-full h-full min-h-[300px] sm:min-h-[500px] md:min-h-[calc(100vh-127px)]">
      {!navigator.onLine && (
        <div className="fixed top-0 left-0 right-0 bg-yellow-300 text-center p-2">
          You are offline. Some features may be unavailable.
        </div>
      )}
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
                    return (
                      <div
                        style={style}
                        className="text-center p-4 bg-gray-200"
                      >
                        Loading...
                      </div>
                    );
                  }
                  return transaction ? (
                    <div style={{ ...style, padding: '2px', minWidth: '100%' }}>
                      <Transaction
                        transaction={transaction}
                        onDelete={onDelete}
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
