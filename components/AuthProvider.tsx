"use client";
import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from 'nextjs-toploader';

export default function AuthProvider({ children }: { children: ReactNode }) {

    return (
        <>
            <SessionProvider>
                <NextTopLoader />
                <Toaster position="top-right" />
                { children }
            </SessionProvider>
        </>
    )
}