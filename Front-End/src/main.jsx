import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./Redux/store";
import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/sonner";
import { route } from "./router";
import { RouterProvider } from "react-router-dom";
import { SnackbarProvider } from "notistack";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <SnackbarProvider
          maxSnack={2}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}>
          <RouterProvider router={route} />
        </SnackbarProvider>

        <Toaster />
      </Provider>
    </PersistGate>
  </StrictMode>
);
