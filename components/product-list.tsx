"use client";

import { useState } from "react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const products = [
  { desc: "iPad", price: 20000 },
  { desc: "iPhone 8", price: 20000 },
  { desc: "iPhone X", price: 30000 },
] as const;

export const ProductList = () => {
  const [selected, setSelected] = useState<number>(0);

  return (
    <List>
      {/* Array.map 在 iterate 的時候，會將該次 iterate 的物品的 index 做為第二個參數傳入 */}
      {/**
       * Array.map(value, index, array)
       * ? value: 當次 iterate 的值
       * ? index: 當次 iterate 的 index
       * ? array: 整個 array 本身
       */}
      {products.map((product, idx) => (
        <ListItem divider key={product.desc}>
          <ListItemButton
            selected={idx === selected}
            onClick={() => setSelected(idx)}
          >
            <ListItemText primary={product.desc} secondary={product.price} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
