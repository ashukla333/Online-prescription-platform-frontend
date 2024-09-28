"use client";
import { SnackbarProvider } from "notistack";

export default function ToasterContainerSnackbar({ children }) {
  return (
    <SnackbarProvider
      maxSnack={1}
      autoHideDuration={2000}
      anchorOrigin={{
        vertical: "top", // 'top' or 'bottom'
        horizontal: "center", // 'left', 'center', or 'right'
      }}
    >
      {children}
    </SnackbarProvider>
  );
}