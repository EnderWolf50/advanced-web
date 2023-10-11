import { Typography } from "@mui/material";

import { ProductList } from "@/components/product-list";

export default function ProductsPage() {
  return (
    <div>
      <Typography>This is products (/products) page</Typography>
      <ProductList />
    </div>
  );
}
