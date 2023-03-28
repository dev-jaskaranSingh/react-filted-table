import React, { useState } from "react";

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

function ProductRow(props) {
  const product = props.product;
  const name = product.stocked ? product.name : <span style={{ color: 'red' }}>{product.name}</span>;
  
  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductCategoryRow(props) {
  const category = props.category;
  
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

function FilteredTable() {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value);
  };

  const handleInStockChange = (event) => {
    setInStockOnly(event.target.checked);
  };

  let rows = [];
  let lastCategory = null;
  
  PRODUCTS.forEach((product) => {
    // Filter by search text
    const nameMatches = product.name.toLowerCase().includes(filterText.toLowerCase());
    
    // Filter by in stock only
    const isStocked = inStockOnly ? product.stocked : true;
    
    if (nameMatches && isStocked) {
      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow key={product.category} category={product.category} />);
      }
      rows.push(<ProductRow key={product.name} product={product} />);
      lastCategory = product.category;
    }
  });

  return (
    <div>
      <form>
        <input type="text" placeholder="Search..." value={filterText} onChange={handleFilterTextChange} />
        <br />
        <label>
          <input type="checkbox" checked={inStockOnly} onChange={handleInStockChange} />
          Only show products in stock
        </label>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

export default FilteredTable;