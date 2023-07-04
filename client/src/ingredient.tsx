import { useState, useEffect } from 'react';
import { connectivity } from '../src/index';
import { z } from 'zod';
import './ingredient.css';

const IngredientSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  quantity: z.number(),
  unit: z.string(),
});

type Ingredient = z.infer<typeof IngredientSchema>;

export default function Ingredient() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [details, setDetails] = useState<Ingredient[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await connectivity.ingredients.ingredientList.query();
      setDetails(response);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newIngredient: Ingredient = {
      name: name,
      quantity: parseInt(quantity),
      unit: unit,
    };

    try {
      await connectivity.ingredients.ingredientCreate.mutate(newIngredient);
      console.log('Ingredient added successfully');
      fetchData();
    } catch (error) {
      console.error('Error:', error);
    }

    setName('');
    setQuantity('');
    setUnit('');
  };

  const handleDelete = async (itemId: number) => {
    try {
      await connectivity.ingredients.ingredientDelete.mutate(itemId);
      setDetails((prevDetails) => prevDetails.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdate = async (itemId: number, updatedIngredient: Ingredient) => {
    try {
      await connectivity.ingredients.ingredientUpdate.mutate({ id: itemId, ...updatedIngredient });
      console.log('Ingredient updated successfully');
      fetchData();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdateClick = (itemId: number) => {
    const selectedIngredient = details.find((item) => item.id === itemId);
    if (selectedIngredient) {
      setName(selectedIngredient.name);
      setQuantity(selectedIngredient.quantity.toString());
      setUnit(selectedIngredient.unit);
    }
  };

  const handleSaveUpdate = async (itemId: number) => {
    const updatedIngredient: Ingredient = {
      name: name,
      quantity: parseInt(quantity),
      unit: unit,
    };

    handleUpdate(itemId, updatedIngredient);

    setName('');
    setQuantity('');
    setUnit('');
  };

  return (
    <div className="body">
      <div className="left">
        <h2 className='add'>Add Ingredients</h2>
        <form onSubmit={handleSubmit}>
          <div className="d1">
            <label>Name:</label>
            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="d1">
            <label>Quantity:</label>
            <input type="text" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </div>
          <div className="d1">
            <label>Unit:</label>
            <input type="text" name="unit" value={unit} onChange={(e) => setUnit(e.target.value)} />
          </div>
          <button  className="submit"type="submit">Add</button>
        </form>
      </div>
      <div className="right">
        <h2 className='ingredient'>Ingredients</h2>
        <table border={1}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody >
            {details.map((item) => {
              const { id, name, quantity, unit } = item;

              return (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{quantity}</td>
                  <td>{unit}</td>
                  <td className='button-3'>
                    <button onClick={() => handleDelete(id)}>Delete</button>
                    <button onClick={() => handleUpdateClick(id)}>Update</button>
                    <button onClick={() => handleSaveUpdate(id)}>Save</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
