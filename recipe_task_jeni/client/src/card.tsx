import { useState, useEffect } from 'react';
import './card.css';
import { connectivity } from '../src/index';
// import { Link } from 'react-router-dom';

export default function Card({ cart, setCart, handleAddToCart }) {
  const [count, setCount] = useState([]);
  const [details, setDetails] = useState([]);
  const [selectedRecipes, setSelectedRecipes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await connectivity.receipes.receipelist.query();
      setDetails(response);
      setCount(response.map((item) => ({ id: item.id, count: 0 })));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAdd = (recipe) => {
    setCart(cart + 1);

    // Update the count state to reflect the added recipe
    setCount((prevCount) =>
      prevCount.map((c) => (c.id === recipe.id ? { ...c, count: c.count + 1 } : c))
    );

    setSelectedRecipes([...selectedRecipes, recipe]);
    handleAddToCart(recipe);
  };

  return (
    <>
      <div className="card-body">
        {details.map((item) => (
          <div className="card1" key={item.id}>
            <div className="item-left">
              <h4 className='namecard'>{item.name}</h4>
              <p className='descriptioncard'>{item.description}</p>
              <h3 className='pricecard'>${item.price}</h3>
            </div>
            <div className="item-right">
              <div className='quantity'>
                <div>
                  <h4>
                    Quantity<span className='countborder'>
                      {count.find((c) => c.id === item.id)?.count || 0}
                    </span>
                  </h4>
                </div>
                <div>
                  <button
                    onClick={() =>
                      setCount((prevCount) =>
                        prevCount.map((c) =>
                          c.id === item.id ? { ...c, count: c.count + 1 } : c
                        )
                      )
                    }
                    className="b1"
                  >
                    +
                  </button>
                </div>
                <div>
                  <button
                    onClick={() =>
                      setCount((prevCount) =>
                        prevCount.map((c) =>
                          c.id === item.id ? { ...c, count: c.count - 1 } : c
                        )
                      )
                    }
                    className="b1"
                  >
                    -
                  </button>
                </div>
              </div>
              <div className='addbuttondiv'>
                <button className="addbutton" onClick={() => handleAdd(item)}>+Add</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
