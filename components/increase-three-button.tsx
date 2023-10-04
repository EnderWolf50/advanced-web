"use client";

import { useState } from "react";
import { Button, Typography } from "@mui/material";

export const IncreaseThreeButton = () => {
  const [number, setNumber] = useState(0);

  const handleIncrease = () => {
    // 由於 number 在 setNumber 後不會馬上被更新，所以這裡的結果會跟預期的不同
    // setNumber(number + 1);
    // setNumber(number + 1);
    // setNumber(number + 1);

    // 這裡將 callback function 傳給 setNumber，React 會在執行更新時自動呼叫，並將 "上一次更新後的值" 作為第一個參數傳入
    setNumber((prev) => prev + 1);
    setNumber((prev) => prev + 1);
    setNumber((prev) => prev + 1);

    // 通常只要 setState 動作與上一次相關，就會使用 callback function 的寫法，確保接收到的 state 是最新的
  };

  return (
    <div>
      <Typography>Current number: {number}</Typography>
      <Button variant="contained" onClick={handleIncrease}>
        Increase by 3
      </Button>
    </div>
  );
};
