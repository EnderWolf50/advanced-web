import { AppBar, Box, Button, Toolbar } from "@mui/material";

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ display: "flex" }}>
          <Button href="/" color="inherit">
            Home
          </Button>
          <Button href="/products" color="inherit">
            Products
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
