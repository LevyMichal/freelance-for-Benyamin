import InfiniteScroll from "react-infinite-scroll-component";

export default function Table({ columns, data, onRowClick, loadMoreData, hasMore }) {

    return (
        <div
            id="scrollableDiv"
            style={{ height: '750px', overflowY: 'auto', scrollbarWidth: 'none' }}
        >
            <InfiniteScroll
                dataLength={data ? data.length : null}
                next={loadMoreData}
                hasMore={hasMore}
                // loader={<p>Loading...</p>} //???
                scrollableTarget="scrollableDiv"
            >

                <div className="table w-full border-collapse">
                    {/* Table Header */}
                    <div className="table-header-group">
                        <div className="table-row sticky top-0 z-10 bg-neutral-50 border-b-2 border-neutral-200">
                            <div className="left-0 top-0 bottom-0 w-2"></div>
                            {columns.map((column) => (
                                <div className="table-cell p-4 text-left font-bold" key={column.accessor}>
                                    {column.Header}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Table Body */}
                    <div className="table-row-group">
                        {data ? (
                            data.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => onRowClick(item)}
                                    className="relative table-row hover:shadow-lg transition-all duration-300 cursor-pointer border-b-2 border-neutral-100 group"
                                >
                                    <div className="absolute left-0 top-0 bottom-0 w-2 group-hover:bg-violet-500 group-hover:rounded-l-lg transition-all duration-300"></div>
                                    {columns.map((column, index) => (
                                        <div
                                            className={`table-cell p-6 ${index === 0 ? 'font-bold' : ''}`}
                                            key={column.accessor}
                                        >
                                            {item[column.accessor]}
                                        </div>
                                    ))}
                                </div>
                            ))
                        ) : (
                            <div className='relative table-row'>
                                <div className="absolute left-0 top-0 bottom-0 w-2"></div>
                                <div className="table-cell pt-6 text-center text-base font-normal">
                                    No Result found
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </InfiniteScroll>
        </div>
    );
}
