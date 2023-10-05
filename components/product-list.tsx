"use client";

import { useRef, useState } from "react";
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

const initialDialogState: {
  open: boolean;
  mode?: "add" | "edit";
  idx: number;
} = {
  open: false,
  mode: undefined,
  idx: -1,
};

const modeMap: Record<
  NonNullable<(typeof initialDialogState)["mode"]>,
  string
> = {
  add: "新增商品",
  edit: "編輯商品",
};

export const ProductList = () => {
  const [selected, setSelected] = useState<number>(0);

  const [products, setProducts] = useState(initialProducts);
  const [dialogState, setDialogState] = useState(initialDialogState);

  const descInputRef = useRef<HTMLInputElement | null>(null);
  const priceInputRef = useRef<HTMLInputElement | null>(null);

  const handleClose = () => {
    setDialogState(initialDialogState);
  };

  const handleAddClick = () => {
    // 開啟 dialog，設定為模式為新增
    setDialogState((prev) => ({ ...prev, open: true, mode: "add" }));
  };
  const handleEditClick = (idx: number) => {
    // 開啟 dialog，設定為模式為編輯，並指定要編輯的物品 index
    setDialogState((prev) => ({ ...prev, open: true, mode: "edit", idx }));
  };
  const handleDeleteClick = (idx: number) => {
    // 使用 Array.filter 對照是否 "不為" 指定的 index，來過濾出新的陣列
    // 相較於 Array.splice，Array.filter 不會影響原本的陣列，而是返回一個新的陣列
    setProducts((prev) => prev.filter((_, i) => i !== idx));
  };
  const handleDialogProductSubmit = () => {
    const { mode, idx } = dialogState;
    const productInfo = {
      desc: descInputRef.current!.value,
      price: priceInputRef.current!.valueAsNumber,
    };

    if (mode === "add") {
      // 新增商品到 `products` state
      setProducts((prev) => [...prev, productInfo]);
    } else if (mode === "edit") {
      setProducts((prev) =>
        // 如果 index 相同，回傳編輯後的商品，否則回傳原本的商品
        prev.map((existingProduct, i) =>
          idx === i ? productInfo : existingProduct
        )
      );
    }
    // 重置 dialog state
    setDialogState(initialDialogState);
  };

  const modeText = dialogState.mode ? modeMap[dialogState.mode] : "";

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
      <Button variant="contained" onClick={handleAddClick}>
        新增商品
      </Button>
      <Dialog
        open={dialogState.open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>{modeText}</DialogTitle>
        <DialogContent>
          <TextField
            label="產品描述"
            variant="outlined"
            name="desc"
            margin="normal"
            fullWidth
            inputRef={descInputRef}
          />
          <TextField
            label="產品價格"
            variant="outlined"
            name="price"
            type="number"
            margin="normal"
            fullWidth
            inputRef={priceInputRef}
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleDialogProductSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
