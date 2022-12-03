import { Box } from "./Box";


export const Layout = ({ children }: any) => (
  <Box
    css={{
      maxW: "100%",
      height: "min-content",
      minHeight: "100vh",
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
    }}
  >
    {children}
  </Box>
);
