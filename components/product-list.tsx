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

const initialFormProduct = {
  desc: "",
  price: 0,
};

export const ProductList = () => {
  const [selected, setSelected] = useState<number>(0);
  const [open, setOpen] = useState(false);

  const [products, setProducts] = useState(initialProducts);
  const [dialogProduct, setDialogProduct] = useState(initialFormProduct);

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 如果 input 欄位的 type 為 number，則取用轉為數字後的數值
    const value =
      e.target.type !== "number" ? e.target.value : e.target.valueAsNumber;
    setDialogProduct((prev) => ({ ...prev, [e.target.name]: value }));
  };
  const handleFormProductSubmit = () => {
    // 新增商品到 `products` state
    setProducts((prev) => [...prev, dialogProduct]);
    // 關閉 dialog
    setOpen(false);
    // 重置 dialog 內的欄位
    setDialogProduct(initialFormProduct);
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
            value={dialogProduct.desc}
            onChange={handleFieldChange}
            margin="normal"
            fullWidth
          />
          <TextField
            label="產品價格"
            variant="outlined"
            name="price"
            type="number"
            value={dialogProduct.price}
            onChange={handleFieldChange}
            margin="normal"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleFormProductSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
