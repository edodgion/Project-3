import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { NEW_ITEM } from '../utils/mutations';

function NewItem(props) {
  const [formState, setFormState] = useState({ name: '', description: '', image: null, price: 0.0, size: '' });
  const [newItem] = useMutation(NEW_ITEM);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const user = await newItem({
      variables: {
        name: formState.name,
        description: formState.description,
        price: parseFloat(formState.price),
        size: formState.size
      },
    });
    setFormState({ name: '', description: '', image: null, price: 0.0, size: '' })
    console.log("User returned ", user)
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  return (
    <div className="container my-1">
      <Link to="/viewMyCloset">← Go back to Closet</Link>

      <h2>Add a New Item to Your Closet</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="name">Name:</label>
          <input
            placeholder="Name"
            name="name"
            type="text"
            id="name"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="description">Description:</label>
          <input
            placeholder="Description"
            name="description"
            type="text"
            id="description"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="image">Image:</label>
          <input
            placeholder="Image"
            name="image"
            type="image"
            id="image"
            alt="clothing image"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="price">Price:</label>
          <input
            placeholder="Price"
            name="price"
            type="number" 
            step="0.01"
            id="price"
            onChange={handleChange}
          />
        </div>
        {/* <div className="flex-row space-between my-2">
          <label htmlFor="category">Category:</label>
          <input
            placeholder="Category"
            name="Category"
            type="text"
            id="category"
            onChange={handleChange}
          />
        </div> */}
        <div className="flex-row space-between my-2">
          <label htmlFor="size">Size:</label>
          <input
            placeholder="Size"
            name="size"
            type="text"
            id="size"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default NewItem;
