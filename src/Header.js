import React,{useState,useEffect} from "react";
import "./Header.css";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
// import StorefrontIcon from '@mui/icons-material/Storefront';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
// import { auth } from "./firebase";
import logo from "./Images/amazon_PNG11.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {signOut,getAuth,onAuthStateChanged } from "firebase/auth"
function Header() {
  const [{ basket }] = useStateValue();
  const [userEmail, setUserEmail] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // User is signed in, set the user's email in state
        setUserEmail(authUser.email);
      } else {
        // User is signed out, clear the user's email from state
        setUserEmail(null);
      }
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [auth]);

  // Function to sign the user out
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
       
        toast.success("User signed out successfully.", {
          position: toast.POSITION.BOTTOM_RIGHT,
      });
        // You can also redirect to a different page or update your UI as needed.
      })
      .catch((error) => {
        // An error occurred during sign-out.
  
          toast.error(`${error}`, {
          position: toast.POSITION.BOTTOM_RIGHT,
      });
        
      });
  };
    
    return (
     <>
     <ToastContainer />
        {
          userEmail ? (
            <>
         <div className="header">
          <Link to="/">
            <img
            className="header__logo"
            src={logo}
            alt="image"
          />
          </Link>
        
    
        <div className="header__search">
          <input className="header__searchInput" type="text" />
          <SearchIcon className="header__searchIcon" />
        </div>
    
        <div className="header__nav">
          
            <Link to="/" style={{ textDecoration:"none" }}>
              <div className="nav__item">
                <span className="nav__itemLineOne">Hello {userEmail}</span>
                <span className="nav__itemLineTwo" onClick={signOutUser}>Sign Out</span>
              </div>
              </Link>
          
          
    
          <div className="header__option">
            <span className="header__optionLineOne">Your</span>
            <span className="header__optionLineTwo">Orders</span>
          </div>
    
          <Link to="/checkout" style={{ textDecoration: "none" }}>
            <div className="header__optionBasket">
              <ShoppingBasketIcon />
              <span className="header__optionLineTwo header__basketCount">
              {basket.length}
              </span>
            </div>
            </Link>
          
          </div>

        </div>
            
            </>
          )
          :
          
          (  
          <>
          <div className="header">
          <img
            className="header__logo"
            src={logo}
            alt="pic"
          />
        
    
        <div className="header__search">
          <input className="header__searchInput" type="text" />
          <SearchIcon className="header__searchIcon" />
        </div>
    
        <div className="header__nav">
          
            <Link to="/login" style={{ textDecoration:"none" }}>
              <div className="nav__item">
                <span className="nav__itemLineOne">Hello Guest</span>
                <span className="nav__itemLineTwo">Sign In</span>
              </div>
              </Link>
          
          
    
          <div className="header__option">
            <span className="header__optionLineOne">Your</span>
            <span className="header__optionLineTwo">Orders</span>
          </div>
    
          <Link to="/login" style={{ textDecoration: "none" }}>
            <div className="header__optionBasket">
              <ShoppingBasketIcon />
              <span className="header__optionLineTwo header__basketCount">
                {basket.length}
              </span>
            </div>
            </Link>
          
        </div>
        </div>

        </>
        )
        }
      
    
  

</>
    )

    }



export default Header
