import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../features/product/productSlice";
import Pagination from "../pagination/Pagination";
import Spinner from "../Spinner";
import ProductCard from "./ProductCard";
import {BsSearch} from 'react-icons/bs';
import { setSearchQuery } from "../../features/search/searchSlice";

function Product() {
  const dispatch = useDispatch();
  const { isLoading, isError, products } = useSelector((state) => state.products);

  console.log({isLoading});


    //search section
    const searchQuery = useSelector((state) => state.search.searchQuery);

    const filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    //==================


  //PAGINATION CODE
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(6);

  const lastProductIndex = currentPage * productPerPage;
  const firstProductIndex = lastProductIndex - productPerPage;
  const currentProducts = filteredProducts.slice(firstProductIndex, lastProductIndex);
  //========================

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  useEffect(() => {
    dispatch(getAllProducts());
    // dispatch(reset());
  }, [dispatch]);
 
  if (isLoading) {
    <Spinner />;
  }

  return (
    <div id="product" className="flex sm:w-full flex-col w-full">
       {isLoading && (<Spinner/>)}
             {/* SEARCH SECTION */}
      <div className="flex w-full items-center justify-center bg-slate-400 shadow-sm border-2 border-slate-400 py-5">
        <div className="flex items-center justify-center w-[50%] relative">
          <input 
          onChange={handleSearch}
          type="text" 
          placeholder="Search..."
          className="w-full rounded-lg outline-none px-1 sm:px-2 md:px-3" />
          <BsSearch className='flex absolute right-2'/> 
        </div> 
      </div>
      {isError && <p>An error occured!</p>}

      <div className="p-4 w-full sm:w-full flex">
        <div className="grid grid-cols-1 xs:grid-cols-2 ss:grid-cols-3 items-center w-full sm:grid-cols-3 md:grid-cols-4 gap-5">
         
          {currentProducts?.map((product, index) => {
            return (
              <div key={index}>
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>
      </div>
      {/* Pagination controls */}
      <Pagination 
      totalProducts={filteredProducts.length} 
      productPerPage={productPerPage} 
      setCurrentPage={setCurrentPage}
      currentPage = {currentPage}
      />
    </div>
  );
}

export default Product;