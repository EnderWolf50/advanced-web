"use client";

import { useState } from "react";
import { Button, Typography } from "@mui/material";

const min = 0;
const max = 10;

export const RandomNumberButton = () => {
  const [numbers, setNumbers] = useState<number[]>([]);

  const handleAddRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    setNumbers((prev) => [...prev, randomNumber]);
  };

  return (
    <div>
      <Typography>Here is the number list: {numbers.join(", ")}</Typography>
      <Button variant="contained" onClick={handleAddRandomNumber}>
        Add random number ({min} ~ {max})
      </Button>
    </div>
  );
};
