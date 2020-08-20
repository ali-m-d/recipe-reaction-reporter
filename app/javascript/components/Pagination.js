import React from 'react';

const Pagination = ({ recipesPerPage, totalRecipes, paginate, currentPage }) => {
    const pageNumbers = [];
    
    for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
        pageNumbers.push(i);
    }
    
    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item pagination">
                        {number === currentPage &&
                            <a 
                                onClick={(event) => paginate(event, number)} 
                                href="#" 
                                className="page-link font-weight-bolder pagination-btn selected" 
                            >
                                {number}
                            </a>
                        }
                        {number !== currentPage &&
                            <a 
                                onClick={(event) => paginate(event, number)} 
                                href="#" 
                                className="page-link font-weight-bolder pagination-btn" 
                            >
                                {number}
                            </a>
                        }
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;