"use client";
import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from 'nextjs-toploader';
import { Provider } from "react-redux";
import store from "@/redux/store";

export default function AuthProvider({ children }: { children: ReactNode }) {

    return (
        <>
            <SessionProvider>
                <Provider store={store}>
                    <NextTopLoader />
                    <Toaster position="top-right" />
                    { children }
                </Provider>
            </SessionProvider>
        </>
    )
}