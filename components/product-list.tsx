"use client";

import { ChangeEvent, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";

const initialProducts = [
  { desc: "iPad", price: 20000 },
  { desc: "iPhone 8", price: 20000 },
  { desc: "iPhone X", price: 30000 },
];

const initialProductState = {
  desc: "",
  price: 0,
};

export const ProductList = () => {
  const [selected, setSelected] = useState<number>(0);
  const [open, setOpen] = useState(false);

  const [products, setProducts] = useState(initialProducts);
  const [newProduct, setNewProduct] = useState(initialProductState);

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 如果 input 欄位的 type 為 number，則取用轉為數字後的數值
    const value =
      e.target.type !== "number" ? e.target.value : e.target.valueAsNumber;
    setNewProduct((prev) => ({ ...prev, [e.target.name]: value }));
  };
  const handleAddProduct = () => {
    // 新增商品到 `products` state
    setProducts((prev) => [...prev, newProduct]);
    // 關閉 dialog
    setOpen(false);
    // 重置 dialog 內的欄位
    setNewProduct(initialProductState);
  };

  return (
    <div>
      <List>
        {/* Array.map 在 iterate 的時候，會將該次 iterate 的物品的 index 做為第二個參數傳入 */}
        {/**
         * Array.map(value, index, array)
         * ? value: 當次 iterate 的值
         * ? index: 當次 iterate 的 index
         * ? array: 整個 array 本身
         */}
        {products.map((product, idx) => (
          <ListItem key={product.desc} divider>
            <ListItemButton
              selected={idx === selected}
              onClick={() => setSelected(idx)}
            >
              <ListItemText primary={product.desc} secondary={product.price} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" onClick={() => setOpen(true)}>
        新增商品
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>新增商品</DialogTitle>
        <DialogContent>
          <TextField
            label="產品描述"
            variant="outlined"
            name="desc"
            value={newProduct.desc}
            onChange={handleFieldChange}
            margin="normal"
            fullWidth
          />
          <TextField
            label="產品價格"
            variant="outlined"
            name="price"
            type="number"
            value={newProduct.price}
            onChange={handleFieldChange}
            margin="normal"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddProduct}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
