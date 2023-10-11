import { ComponentProps, ComponentType, forwardRef } from "react";
import Link from "next/link";
import { createTheme } from "@mui/material";

const LinkBehaviour = forwardRef<
  ComponentType<typeof Link>,
  ComponentProps<typeof Link>
>(function LinkBehaviour(props, ref) {
  // @ts-ignore
  return <Link ref={ref} {...props} />;
});

export const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehaviour,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehaviour,
      },
    },
  },
  palette: {},
});
