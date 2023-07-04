import './navbar.css';
import { useState, useEffect } from 'react';
import { FaCartShopping } from "react-icons/fa6";

export default function Nav({ cart, cartDetails }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartOpen1, setIsCartOpen1] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderedSuccessfully, setOrderedSuccessfully] = useState(false);
  const [counts, setCounts] = useState({});

  useEffect(() => {
    calculateTotalPrice();
  }, [counts]);

  const handleOpenCart = () => {
    const initialCounts = cartDetails.reduce((counts, recipe) => {
      return { ...counts, [recipe.id]: 1 };
    }, {});
    setCounts(initialCounts);
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setCounts({});
    setIsCartOpen(false);
  };

  const handleSubmitCart = () => {
    setIsCartOpen1(true);
  };

  const handleCloseCart1 = () => {
    setIsCartOpen1(false);
  };

  const handleConfirmOrder = () => {
    // Perform any necessary actions for confirming the order

    // Display the "Ordered Successfully" message
    setOrderedSuccessfully(true);
  };

  const calculateTotalPrice = () => {
    const totalPrice = cartDetails.reduce((total, recipe) => {
      const count = counts[recipe.id] || 0;
      return total + recipe.price * count;
    }, 0);
    setTotalPrice(totalPrice);
  };

  const handleIncreaseCount = (itemId) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [itemId]: (prevCounts[itemId] || 0) + 1,
    }));
  };

  const handleDecreaseCount = (itemId) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [itemId]: Math.max((prevCounts[itemId] || 0) - 1, 0),
    }));
  };

  return (
    <>
      <div className="navbody">
        <h1>ReactMeals</h1>
        <div className='addtocart' onClick={handleOpenCart}>
          <h4 className='nav-ucart'><FaCartShopping /> Your Cart</h4>
          <div className='cart'>
            <h5>{cart}</h5>
          </div>
        </div>
      </div>

      {isCartOpen && (
        <div className="pop">
          <div className="pop-2">
            <div className='pop-3'>
              {cartDetails.map((recipe) => (
                <div className='popup-main' key={recipe.id}>
                  <div className='popupleft'>
                    <div>
                      <p className='recipiename'>{recipe.name}</p>
                      <p className='recipieprice'>${recipe.price}</p>
                    </div>
                    <div className='xcount'>
                      <h4 className='x' >x {counts[recipe.id] || 0}</h4>
                    </div>
                  </div>
                  <div className='popupright'>
                    <button
                      onClick={() => handleIncreaseCount(recipe.id)}
                      className="b1"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleDecreaseCount(recipe.id)}
                      className="b1"
                    >
                      -
                    </button>
                  </div>
                </div>
              ))}
              <div className='tcount'>
                <p className='recipietotalamount'>Total Amount</p>
                <h2>${totalPrice}</h2>
              </div>
            </div>
            <div className='closebutton'>
              <button className="closebtn" onClick={handleCloseCart}>Close</button>
              <button className="orderbutton" onClick={handleSubmitCart}>Order</button>
            </div>
          </div>
        </div>
      )}

      {isCartOpen1 && (
        <div className="pop">
          <div className="pop-2">
            <div className='pop-3'>
              <div className='total'>
                <h1>Total Amount</h1>
                <p className='totalpricep'>${totalPrice}</p>
              </div>

              <div className='second-pop'>
                <div>
                  <label className='d4'> Your Name</label>
                </div>
                <div>
                  <input type='text' />
                </div>
                <div>
                  <label className='d4'> Street</label>
                </div>
                <div>
                  <input type='text' />
                </div>
                <div>
                  <label className='d4'>Postal code</label>
                </div>
                <div>
                  <input type='number' />
                </div>
                <div>
                  <label className='d4'> City</label>
                </div>
                <div>
                  <input type='text' />
                </div>
              </div>
            </div>
            <div className='confirmbutton'>
              <button className="cancelbtn2" onClick={handleCloseCart1}>Cancel</button>
              <button className="confirmbtn2" onClick={handleConfirmOrder}>Confirm</button>
            </div>
          </div>
        </div>
      )}

      {orderedSuccessfully && (
        <div className="pop">
          <div className="pop-2">
            <div className='pop-3'>
              <div className="success-message">
                <p>Ordered Successfully!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
