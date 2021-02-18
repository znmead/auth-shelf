import React, { useState, useEffect } from "react";
import useReduxStore from "../../hooks/useReduxStore";
import { useDispatch, useSelector } from "react-redux";

function ShelfPage() {
  let [addItemToggle, setAddItemToggle] = useState(false);
  const shelf = useSelector((store) => store.shelf);

  const dispatch = useDispatch();
  const store = useReduxStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_ITEM", payload: store.addItemReducer });
    setAddItemToggle(false);
  };

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_ITEM", payload: id });
  };

  const handleDescChange = (e) =>
    dispatch({ type: "SET_ITEM_DESC", payload: e.target.value });

  const handleUrlChange = (e) =>
    dispatch({ type: "SET_ITEM_URL", payload: e.target.value });

  useEffect(() => {
    dispatch({ type: "FETCH_ITEMS" });
  }, []);

  return (
    <div className="container">
      <h2>Shelf</h2>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>URL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shelf.map((item, i) => {
            return (
              <tr key={i}>
                <td>{item.description}</td>
                <td>{item.image_url}</td>
                <td>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {addItemToggle ? (
        <>
          <form onSubmit={handleSubmit}>
            <label htmlFor="input-description">Item Description: </label>
            <input
              type="text"
              id="input-description"
              value={store.addItemReducer.itemDescription}
              onChange={handleDescChange}
              required
            />
            <span> </span>
            <label htmlFor="input-url">Item Image Url: </label>
            <input
              type="url"
              id="input-url"
              value={store.addItemReducer.itemUrl}
              onChange={handleUrlChange}
              required
            />
            <button type="submit">Save</button>
          </form>
        </>
      ) : (
        <button onClick={() => setAddItemToggle(true)}>Add Item</button>
      )}
      <p>All of the available items can be seen here.</p>
    </div>
  );
}

export default ShelfPage;
