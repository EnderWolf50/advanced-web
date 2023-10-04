"use client";

const products = [
  { desc: "iPad", price: 20000 },
  { desc: "iPhone 8", price: 20000 },
  { desc: "iPhone X", price: 30000 },
];

export const ProductList = () => {
  return (
    <List>
      {products.map((product) => (
        <ListItem divider key={product.desc}>
          <ListItemText primary={product.desc} secondary={product.price} />
        </ListItem>
      ))}
    </List>
  );
};
