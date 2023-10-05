"use client";

import { ChangeEvent, useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
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

const initialAddProductState = {
  desc: "",
  price: 0,
};

const initialEditProductState = {
  ...initialAddProductState,
  idx: -1,
};

const getVal = (e: ChangeEvent<HTMLInputElement>) => {
  // 如果 input 欄位的 type 為 number，則取用轉為數字後的數值
  return e.target.type !== "number" ? e.target.value : e.target.valueAsNumber;
};

export const ProductList = () => {
  const [selected, setSelected] = useState<number>(0);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [products, setProducts] = useState(initialProducts);
  const [addProduct, setAddProduct] = useState(initialAddProductState);
  const [editProduct, setEditProduct] = useState(initialEditProductState);

  const handleAddFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddProduct((prev) => ({ ...prev, [e.target.name]: getVal(e) }));
  };
  const handleAddProduct = () => {
    // 新增商品到 `products` state
    setProducts((prev) => [...prev, addProduct]);
    // 關閉 "新增商品 dialog"
    setAddDialogOpen(false);
    // 重置 "新增商品 dialog" 內的欄位
    setAddProduct(initialAddProductState);
  };

  const handleEditClick = (idx: number) => {
    // 將 "編輯商品 dialog" 中的欄位設為要編輯的商品內容
    setEditProduct({ idx, ...products[idx] });
    setEditDialogOpen(true);
  };
  const handleEditFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditProduct((prev) => ({ ...prev, [e.target.name]: getVal(e) }));
  };
  const handleEditProduct = () => {
    setProducts((prev) => {
      // 複製先前的 `products` state
      const newProducts = [...prev];
      // 利用 idx 找到要編輯的商品，並將其內容更新
      newProducts[editProduct.idx] = editProduct;

      return newProducts;
    });
    // 關閉 "編輯商品 dialog"
    setEditDialogOpen(false);
    // 重置 "編輯商品 dialog" 內的欄位
    setEditProduct(initialEditProductState);
  };

  const handleDeleteClick = (idx: number) => {
    // 使用 Array.filter 對照是否 "不為" 指定的 index，來過濾出新的陣列
    // 相較於 Array.splice，Array.filter 不會影響原本的陣列，而是返回一個新的陣列
    setProducts((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleAddProductClose = () => {
    setAddDialogOpen(false);
    setAddProduct(initialAddProductState);
  };
  const handleEditProductClose = () => {
    setEditDialogOpen(false);
    setEditProduct(initialEditProductState);
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
          <ListItem
            key={product.desc}
            divider
            disablePadding
            secondaryAction={
              <>
                <IconButton onClick={() => handleEditClick(idx)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDeleteClick(idx)}>
                  <Delete />
                </IconButton>
              </>
            }
          >
            <ListItemButton
              selected={idx === selected}
              onClick={() => setSelected(idx)}
            >
              <ListItemText primary={product.desc} secondary={product.price} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" onClick={() => setAddDialogOpen(true)}>
        新增商品
      </Button>
      <Dialog
        open={addDialogOpen}
        onClose={handleAddProductClose}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>新增商品</DialogTitle>
        <DialogContent>
          <TextField
            label="產品描述"
            variant="outlined"
            name="desc"
            value={addProduct.desc}
            onChange={handleAddFieldChange}
            margin="normal"
            fullWidth
          />
          <TextField
            label="產品價格"
            variant="outlined"
            name="price"
            type="number"
            value={addProduct.price}
            onChange={handleAddFieldChange}
            margin="normal"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleAddProductClose}>
            Cancel
          </Button>
          <Button onClick={handleAddProduct}>Submit</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={editDialogOpen}
        onClose={handleEditProductClose}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>編輯商品</DialogTitle>
        <DialogContent>
          <TextField
            label="產品描述"
            variant="outlined"
            name="desc"
            value={editProduct.desc}
            onChange={handleEditFieldChange}
            margin="normal"
            fullWidth
          />
          <TextField
            label="產品價格"
            variant="outlined"
            name="price"
            type="number"
            value={editProduct.price}
            onChange={handleEditFieldChange}
            margin="normal"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleEditProductClose}>
            Cancel
          </Button>
          <Button onClick={handleEditProduct}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
