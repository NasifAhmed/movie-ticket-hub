import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import AuthProvider from "./providers/AuthProvider";
import UserProvider from "./providers/UserProvider";
import { router } from "./router/Router";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // refetchOnWindowFocus: false,
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <UserProvider>
                    <HelmetProvider>
                        <RouterProvider router={router} />
                    </HelmetProvider>
                </UserProvider>
            </AuthProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
