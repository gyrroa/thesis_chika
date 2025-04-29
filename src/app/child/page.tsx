"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // For App Router

export default function Home() {
    const router = useRouter();

    return (
        <div className="items-center justify-items-center min-h-screen font-[family-name:var(--font-sans)] bg-[#F2E7DC]">
            <main className="flex flex-col items-center text-center justify-center h-screen gap-[20px] md:gap-[41px] select-none">
                <img src="/create-account/if-child.svg" alt="user-type" className="w-[315px] h-auto drop-shadow-[0px_8px_16px_rgba(196,85,0,0.35)]" />
                <div className="flex flex-col">
                    <h1 className="font-extrabold text-[24px] md:text-4xl text-[#F90] [text-shadow:0_0_4px_rgba(255,153,0,0.35)] leading-tight">Ask a <span className="text-[#C45500]">parent</span> to set up<br /> the app</h1>
                </div>
                <div className="flex gap-[10px] w-[84px] justify-center">
                    <Button variant="custom" className="text-[16px]" onClick={() => router.back()}>OKAY</Button>
                </div>
            </main>
        </div>
    );
}
