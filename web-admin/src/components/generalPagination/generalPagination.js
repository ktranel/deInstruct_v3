import React from 'react';
import ReactPaginate from 'react-paginate';


export const GeneralPagination = ({ forcePage, pages, onPageChange }) => {
    return(
        <div className="pagination-container">
            <ReactPaginate
                forcePage={forcePage}
                pageCount={pages}
                pageRange={10}
                pageMargin={5}
                pageClassName='paginate paginate-default'
                previousClassName='paginate paginate-previous'
                nextClassName='paginate paginate-next'
                onPageChange={onPageChange}
            />
        </div>
    )
};


