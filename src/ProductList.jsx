import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde.", cost: "$12" },
        { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg", description: "Removes mold spores.", cost: "$18" },
        { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Adds humidity indoors.", cost: "$14" },
        { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", description: "Cleans indoor air.", cost: "$20" },
        { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/17/47/aloe-vera-3284568_1280.jpg", description: "Soothes skin and purifies air.", cost: "$10" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://cdn.pixabay.com/photo/2015/07/02/10/22/lavender-828911_1280.jpg", description: "Calming scent.", cost: "$20" },
        { name: "Jasmine", image: "https://cdn.pixabay.com/photo/2018/01/08/18/00/flower-3069926_1280.jpg", description: "Sweet fragrance.", cost: "$18" },
        { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Invigorating aroma.", cost: "$15" },
        { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/26/17/28/mint-1162812_1280.jpg", description: "Fresh herbal scent.", cost: "$10" },
        { name: "Eucalyptus", image: "https://cdn.pixabay.com/photo/2016/03/09/09/20/eucalyptus-1245791_1280.jpg", description: "Refreshing scent.", cost: "$22" },
        { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2016/07/28/19/27/lemon-balm-1548888_1280.jpg", description: "Citrusy aroma.", cost: "$14" }
      ]
    },
    {
      category: "Medicinal Plants",
      plants: [
        { name: "Echinacea", image: "https://cdn.pixabay.com/photo/2014/12/10/06/18/echinacea-562817_1280.jpg", description: "Boosts immunity.", cost: "$16" },
        { name: "Peppermint", image: "https://cdn.pixabay.com/photo/2017/07/12/12/23/peppermint-2496783_1280.jpg", description: "Aids digestion.", cost: "$12" },
        { name: "Chamomile", image: "https://cdn.pixabay.com/photo/2016/08/16/18/16/chamomile-1598711_1280.jpg", description: "Soothes anxiety.", cost: "$15" },
        { name: "Calendula", image: "https://cdn.pixabay.com/photo/2019/07/19/08/29/calendula-4348281_1280.jpg", description: "Heals skin.", cost: "$12" },
        { name: "Tulsi", image: "https://cdn.pixabay.com/photo/2018/04/02/17/47/aloe-vera-3284568_1280.jpg", description: "Relieves stress.", cost: "$9" },
        { name: "Ginseng", image: "https://cdn.pixabay.com/photo/2016/07/28/19/27/lemon-balm-1548888_1280.jpg", description: "Increases energy.", cost: "$25" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prevState) => ({
      ...prevState,
      [plant.name]: true,
    }));
  };

  return (
    <div>
      <div className="navbar" style={{ backgroundColor: '#4CAF50', color: '#fff', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Paradise Nursery</h2>
        <div>
          <button onClick={() => setShowCart(false)} style={{ margin: '0 10px' }}>Plants</button>
          <button onClick={() => setShowCart(true)}>Cart ({totalQuantity})</button>
        </div>
      </div>
      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((categoryObj, index) => (
            <div key={index}>
              <h1>{categoryObj.category}</h1>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {categoryObj.plants.map((plant, plantIndex) => (
                  <div key={plantIndex} className="product-card" style={{ border: '1px solid #ccc', padding: '10px', width: '200px' }}>
                    <img src={plant.image} alt={plant.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p>{plant.cost}</p>
                    <button disabled={addedToCart[plant.name]} onClick={() => handleAddToCart(plant)}>
                      {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
