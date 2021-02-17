import React, { useState } from 'react';

function ShelfPage() {
  let [addItemToggle, setAddItemToggle] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setAddItemToggle(false);
  };

  return (
    <div className="container">
      <h2>Shelf</h2>
      {addItemToggle ?
        <>
          <form onSubmit={handleSubmit}>
            <label htmlFor='input-description'>Item Description: </label>
            <input type='text' id='input-description' required />
            <span> </span>
            <label htmlFor='input-url'>Item Image Url: </label>
            <input type='url' id='input-url' required />
            <button type='submit'>Save</button>
          </form>
        </> : <button onClick={() => setAddItemToggle(true)}>Add Item</button>}
      <p>All of the available items can be seen here.</p>
    </div>
  );
}

export default ShelfPage;
