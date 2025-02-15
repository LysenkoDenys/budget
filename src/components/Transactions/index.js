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
  const sortedData = useMemo(
    () => [...data].sort((a, b) => new Date(b.date) - new Date(a.date)),
    [data]
  );

  const getItemSize = (index) => itemSizeMap.current[index] || 60;

  const setItemSize = (index, size) => {
    if (itemSizeMap.current[index] !== size) {
      itemSizeMap.current[index] = size;
      listRef.current?.resetAfterIndex(index);
    }
  };

  const isItemLoaded = (index) => !!data[index];
  const loadMoreItems = isNextPageLoading ? () => {} : loadMoreRows;
  const itemCount = hasNextPage ? data.length + 1 : data.length;

  return (
    <div className="w-full h-full min-h-[300px] sm:min-h-[500px] md:min-h-[calc(100vh-127px)]">
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={itemCount}
            loadMoreItems={loadMoreItems}
          >
            {({ onItemsRendered, ref }) => (
              <List
                ref={listRef}
                height={height}
                width={width}
                itemCount={itemCount}
                itemSize={getItemSize}
                estimatedItemSize={120}
                onItemsRendered={onItemsRendered}
                itemData={data}
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
