import React from 'react';
import { FixedSizeList as List } from 'react-window';
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
  const isItemLoaded = (index) => !!data[index];
  const loadMoreItems = isNextPageLoading ? () => {} : loadMoreRows;
  const itemCount = hasNextPage ? data.length + 1 : data.length;

  return (
    // <div className="h-[calc(100vh-127px)]">
    //   <AutoSizer>
    //     {({ height, width }) => (
    //       <InfiniteLoader
    //         isItemLoaded={isItemLoaded}
    //         itemCount={itemCount}
    //         loadMoreItems={loadMoreItems}
    //       >
    //         {({ onItemsRendered, ref }) => (
    //           <List
    //             className="List"
    //             height={height}
    //             itemCount={itemCount}
    //             itemSize={46}
    //             width={width}
    //             itemData={data}
    //             ref={ref}
    //             onItemsRendered={onItemsRendered}
    //           >
    //             {({ index, style }) => {
    //               const transaction = data[index];
    //               if (!transaction && hasNextPage) {
    //                 return (
    //                   <div
    //                     style={style}
    //                     className="text-center p-4 bg-gray-200"
    //                   >
    //                     Loading...
    //                   </div>
    //                 );
    //               }
    //               return transaction ? (
    //                 <div
    //                   style={style}
    //                   className="bg-light-blue p-4 border rounded mb-2"
    //                 >
    //                   <Transaction
    //                     key={transaction.id}
    //                     transaction={transaction}
    //                     onDelete={onDelete}
    //                     onStarClick={onStarClick}
    //                   />
    //                 </div>
    //               ) : null;
    //             }}
    //           </List>
    //         )}
    //       </InfiniteLoader>
    //     )}
    //   </AutoSizer>
    // </div>
    <div style={{ height: 'calc(100vh - 127px)' }} className="w-full">
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={itemCount}
            loadMoreItems={loadMoreItems}
          >
            {({ onItemsRendered, ref }) => (
              <List
                height={height}
                width={width}
                itemCount={itemCount}
                itemSize={55}
                itemData={data}
                onItemsRendered={onItemsRendered}
                ref={ref}
              >
                {({ index, style }) => {
                  const transaction = data[index];

                  if (!transaction && hasNextPage) {
                    return (
                      <div
                        style={style}
                        className="text-center p-4 bg-gray-200"
                      >
                        Loading more transactions...
                      </div>
                    );
                  }

                  return transaction ? (
                    <div style={style} className="border rounded mb-2">
                      <Transaction
                        key={transaction.id}
                        transaction={transaction}
                        onDelete={onDelete}
                        onStarClick={onStarClick}
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
