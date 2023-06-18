import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import {
  addToCart,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  clearCart,
  decreaseCartItem,
  removeItemFromCart,
} from "../features/cartSlice";
import { useEffect } from "react";
import PayButoon from "./PayButoon";


function Cart() {
  const dispatch = useDispatch();
  const { cartItems, cartTotalAmount } = useSelector((state) => state.cart);
 
  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [cartItems, dispatch]);

  const clrearCart = () => {
    dispatch(clearCart());
  };

  const increaseCart = (item) => {
    dispatch(addToCart(item));
  };

  const decreaseCart = (item) => {
    dispatch(decreaseCartItem(item));
  };

  const removeFromCart = (item) => {
    dispatch(removeItemFromCart(item));
  };



  return (
    <div className="flex w-full items-center justify-center">
      <div className="w-full md:w-[90%] sm:w-[90%] m-9">
        <h1 className="text-3xl my-6 font-mono font-bold text-amber-500 pl-1">
          Shopping cart
        </h1>
        <div>
          {cartItems.length === 0 ? (
            <div className="flex flex-col w-full items-center justify-center bg-sky-600 text-white h-screen font-playfair ">
              <h1 className="text-2xl sm:text-3xl md:text-5xl">
                Your cart is empty
              </h1>
              <Link to="/">
                <h1 className="sm:text-xl md:text-3xl bg-amber-400 py-1 px-6 rounded-lg mt-9">
                  &larr;Go For Shopping
                </h1>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col">
              <table className="w-full">
                <thead className="flex w-full justify-between border-2 p-3">
                  <tr className="w-full flex justify-between">
                    <th className="flex w-full text-center">Product</th>
                    <th className="flex w-full text-center">Name</th>
                    <th className="flex w-full text-center">Price</th>
                    <th className="flex w-full text-center">Quantity</th>
                    <th className="flex w-full text-center">Total</th>
                  </tr>
                </thead>

                <tbody>
                  {cartItems.map((item, index) => {
                    const { image, cartQuantity, name, price } = item;
                    return (
                      <tr
                        key={index}
                        className="flex justify-between border my-2 items-center font-mono"
                      >
                        <td className="flex text-center w-full">
                          <div>
                            <img
                              src={item.image.url}
                              alt={name}
                              className="w-[200px] h-[110px] sm:h-[150px] md:h-[150px] object-cover"
                            />
                          </div>
                        </td>
                        <td className="flex flex-col w-full">
                          <h1 className="flex text-center w-full pl-1">
                            {name}
                          </h1>
                          <button
                            onClick={() => removeFromCart(item)}
                            className="text-slate-500 pl-2 cursor-pointer font-bold"
                          >
                            Remove
                          </button>
                        </td>
                        <td className="flex text-center w-full font-bold text-green-600">
                          ${price}
                        </td>
                        <td className="flex w-full items-center">
                          <div className="border flex">
                            <button
                              onClick={() => decreaseCart(item)}
                              className="bg-slate-200 w-full px-3"
                            >
                              -
                            </button>
                            <b className="px-3">{cartQuantity}</b>
                            <button
                              onClick={() => increaseCart(item)}
                              className="bg-slate-200 w-full px-3"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="flex text-center w-full font-bold text-green-600">
                          ${cartQuantity * price}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* clear cart and subtotal section */}
              <div className=" flex flex-col sm:flex-row md:flex-row w-full my-5 font-playfair">
                {/* left side clear cart  */}
                <div className="flex-1 w-screen p-5">
                  <button
                    onClick={() => clrearCart()}
                    className="border px-9 py-1 rounded-lg bg-teal-600 text-white text-xl"
                  >
                    Clear cart
                  </button>
                </div>
                {/* right side subtotal section */}
                <div className="flex-1 flex-col w-screen p-5 text-2xl font-mono  text-slate-500 border-2 rounded-lg sm:border-none md:border-none">
                  <div className="flex w-full justify-between border-b-2 font-bold">
                    <h1>Subtotal</h1>
                    <b className="text-amber-500">${cartTotalAmount}</b>
                  </div>
                  <span className="text-sm">
                    Taxes and shipping calculated at checkout!
                  </span>
                  <PayButoon cartItems={cartItems} />
                  <div className=" font-extrabold cursor-pointer text-teal-600 hover:scale-105 duration-700 ml-2">
                    &larr;
                    <Link to="/">Continue To Shopping</Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;