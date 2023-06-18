import { Link, useNavigate } from "react-router-dom";
import { BsFillCartCheckFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CALCULATE_TOTAL_QUANTITY } from "../features/cartSlice";
import { reset, setLoguout } from "../features/auth/authSlie";
import { Admin } from "./AdminRoute";

function Header() {
  const [icon, setIcon] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [scrollPage, setScrollPage] = useState(false);

  const { cartTotalQuantity, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const isAdmin = user?.user?.isAdmin;

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, cartItems]);

  const toggleHandler = () => {
    setIcon(!icon);
  };

  const logoutHandler = () => {
    dispatch(setLoguout());
    dispatch(reset());
    navigate("/login");
  };
  

  const fixScroll = ()=>{
    if(window.scrollY >30){//if greater than 50px;
      setScrollPage(true);
    }else{
      setScrollPage(false);
    }
  };
  window.addEventListener('scroll', fixScroll);

  return (
    <div
      className={
        scrollPage
          ? "flex z-50 fixed w-full h-[100px] bg-black text-white items-center px-2"
          : "flex z-50 w-full h-[100px] bg-black text-white items-center px-2"
      }
    >
      <div className="flex flex-row w-full justify-between">
        {/* logo sectiion */}
        <Link
          to="/"
          className="flex w-full font-playfair ss:text-xl sm:text-2xl md:text-2xl"
        >
          <h1 className="font-extrabold ">
            ONLINE - <span className="text-amber-500">STORE</span>
          </h1>
        </Link>
        <div className="flex w-full items-center justify-center text-[13px] ss:text-[17px]">
          <h1>Hey <span className="text-amber-500 font-extrabold">{user?.user.name}&nbsp;</span>Welcome</h1>
        </div>
        {/* links section */}
        <div className="flex">
          <ul className="hidden sm:flex md:flex  items-center gap-2 sm:gap-2 md:gap-5">
            {user ? (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <Admin>
                  <li>
                    <Link to="/admin">Admin</Link>
                  </li>
                </Admin>
                <li>
                  <button onClick={() => logoutHandler()} type="submit">
                    Logout
                  </button>
                </li>
                {!isAdmin && 
                <li>
                  <Link to="/user-orders">Orders</Link>
                </li>}
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
          {/* toggle icons section */}
          <div className="flex z-50">
            <Link
              to="/cart"
              className="flex w-full items-center justify-end pr-14 sm:px-8 md:px-8 text-xl font-playfair relative"
            >
              <BsFillCartCheckFill className="sm:text-3xl md:text-4xl" />
              <p className="absolute top-[-23px] text-xl">
                {cartTotalQuantity}
              </p>
            </Link>
            <div
              onClick={toggleHandler}
              className="flex sm:hidden md:hidden items-center text-2xl font-playfair relative"
            >
              {icon ? (
                <AiOutlineClose className="sm:text-3xl md:text-4xl cursor-pointer absolute right-4" />
              ) : (
                <GiHamburgerMenu className="sm:text-3xl md:text-4xl cursor-pointer absolute right-4" />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* MOBILE MENUE */}
      <div
        className={
          icon
            ? "flex sm:hidden z-40 w-[200px] items-center justify-center h-screen bg-black opacity-70 absolute top-0 right-0"
            : "hidden w-[200px] items-center justify-center h-screen bg-black opacity-70 absolute top-0 right-[-220px]"
        }
      >
        <ul className="flex flex-col justify-center items-center font-playfair gap-2 sm:gap-2 md:gap-5">
          {user ? (
            <>
              <li onClick={toggleHandler}>
                <Link to="/">Home</Link>
              </li>
              {!isAdmin &&
               <li onClick={toggleHandler}>
                <Link to="/user-orders">Orders</Link>
              </li>}
              <li  onClick={toggleHandler}>
                <button onClick={logoutHandler} type="submit">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li onClick={toggleHandler}>
                <Link to="/">Home</Link>
              </li>
              <li onClick={toggleHandler}>
                <Link to="/register">Register</Link>
              </li>

              <li onClick={toggleHandler}>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;