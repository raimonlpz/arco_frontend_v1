import { Box } from "./Box";


export const Layout = ({ children }: any) => (
  <Box
    css={{
      maxW: "100%",
      height: "min-content",
      alignItems: "center",
      justifyContent: "center",
      display: "flex"
    }}
  >
      {children}
  </Box>
);
