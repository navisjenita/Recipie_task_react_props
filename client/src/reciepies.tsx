import React, { useState, useEffect } from 'react';
import { connectivity } from '../src/index';
import './recipie.css';

export default function Receipe() {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [instruction, setInstruction] = useState('');
  const [price, setPrice] = useState('');
  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await connectivity.receipes.receipelist.query();
      setDetails(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const reset = () => {
    setUsername('');
    setDescription('');
    setInstruction('');
    setPrice('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReceipe = {
      name: username,
      description: description,
      cookingInstructions: instruction,
      customerId: 1,
      price: parseFloat(price)
    };

    try {
      await connectivity.receipes.receipecreate.mutate(newReceipe);
      console.log('Recipe added successfully');
      fetchData(); // Refresh the data after adding a new recipe
      reset();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await connectivity.receipes.receipedelete.mutate(itemId);
      setDetails((prevDetails) => prevDetails.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdate = async (itemId, updatedReceipe) => {
    try {
      await connectivity.receipes.receipeupdate.mutate({ id: itemId, data: updatedReceipe });
      console.log('Recipe updated successfully');
      fetchData();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdateClick = (itemId) => {
    const selectedReceipe = details.find((item) => item.id === itemId);
    if (selectedReceipe) {
      setUsername(selectedReceipe.name);
      setDescription(selectedReceipe.description);
      setInstruction(selectedReceipe.cookingInstructions);
       setPrice(selectedReceipe.price);
    }
  };

  const handleSaveUpdate = async (itemId) => {
    const updatedReceipe = {
      name: username,
      description: description,
      cookingInstructions: instruction,
      customerId: 1,
      price: parseFloat(price)
    };

    handleUpdate(itemId, updatedReceipe);

    reset();
  };

  return (
    <>
      <div className='body'>
        <div className='leftbox'>
          <h2> Add Receipes</h2>
          <form onSubmit={handleSubmit}>
            <div className='d1'>
              <div>
              <label>Name:</label>
              </div>
              <input type="text" name="name" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className='d1'>
              <div>
              <label>Description:</label>
              </div>
              <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className='d1'>
              <div>
              <label>Cooking instruction:</label>
              </div>
              <input type='text' name="cookinginstruction" value={instruction} onChange={(e) => setInstruction(e.target.value)}/>
            </div>

            <div className='d1'>
              <div>
              <label>Price:</label>
              </div>
              <input type='text' name="Price" value={price} onChange={(e) => setPrice(e.target.value)}/>
            </div>
            <button type="submit" className='d2'>Add </button>
          </form>
        </div>
        <div className='Rightbox'>
          <h2 className='recipies'>Receipes</h2>
          <table border={1} className='right'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Instruction</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {details.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.cookingInstructions}</td>
                  <td>{item.price}</td>
                  <td>
                    <button className='d4' onClick={() => handleDelete(item.id)}>Delete</button>
                    <button onClick={() => handleUpdateClick(item.id)}>Update</button>
                    <button onClick={() => handleSaveUpdate(item.id)}>Save</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
