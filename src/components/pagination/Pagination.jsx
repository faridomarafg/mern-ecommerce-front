import React, { useState } from 'react';

const btnDisabledStyle = 'flex w-[40px] h-[40px] border items-center justify-center bg-slate-300 text-white shadow-xl cursor-pointer  p-1 rounded-lg cursor-not-allowed';

const paginationStyle = 'flex w-[34px] h-[34px] sm:w-[40px]  sm:h-[40px]  md:w-[40px] md:h-[40px] border items-center justify-center bg-sky-500 text-white shadow-xl cursor-pointer hover:bg-slate-500 duration-700 p-1 rounded-lg hover:scale-105';

const paginationStyle2 = 'flex w-[34px] h-[34px] sm:w-[40px]  sm:h-[40px]  md:w-[40px] md:h-[40px] border items-center justify-center bg-amber-400 text-white shadow-xl cursor-pointer hover:bg-amber-600 duration-700 p-1 rounded-lg hover:scale-105';

function Pagination({totalProducts,productPerPage,setCurrentPage,currentPage}) {
    const pages = [];

    const [pageNumberLimit] = useState(5);
    let [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    //1:this function use to select or paginate to a particular-page
    const paginate = (pageNumber)=> {
    setCurrentPage(pageNumber);
    };

    //2: this function use to , got to next-page
    const paginateNext = ()=> {
    setCurrentPage(currentPage + 1);
    //show next set of pagenumbers
    if(currentPage + 1 > maxPageNumberLimit){
        setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
        setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
    }
    };

    //3: this function use to , got to previous-page
    const paginatePrev = ()=> {
    setCurrentPage(currentPage - 1);
    //show prev set of page numbers
    if((currentPage-1)% pageNumberLimit === 0){
        setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
        setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
    }
    };

    for(let i = 1; i<= Math.ceil(totalProducts/productPerPage); i++){
       pages.push(i);
    }

    const totalPages = Math.ceil(totalProducts/productPerPage);

  return (
    <div className="flex w-full items-center justify-center bg-slate-500 py-2 gap-2  shadow-sm">
      <button
        onClick={paginatePrev}
        className={
          currentPage - 1 === 0 ? `${btnDisabledStyle}` : `${paginationStyle}`
        }
        disabled={currentPage - 1 === 0}
      >
        Prev
      </button>

      {pages.map((number) => {
        //for showing the page number from 1-to-5 we use an if-statement
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <li
              onClick={() => paginate(number)}
              key={number}
              className={
                currentPage === number ? paginationStyle2 : paginationStyle
              }
            >
              {number}
            </li>
          );
        }
        return null;
      })}

      <button
        onClick={paginateNext}
        className={
          currentPage + 1 > totalPages
            ? `${btnDisabledStyle}`
            : `${paginationStyle}`
        }
        disabled={currentPage + 1 > totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination