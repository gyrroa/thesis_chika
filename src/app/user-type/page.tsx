'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/ui/header';
import Image from 'next/image';

export default function Home() {
  const [step, setStep] = useState<'userType' | 'child'>('userType');

  return (
    <main className="flex items-center justify-center justify-items-center min-h-dvh font-[family-name:var(--font-sans)] bg-[#F2E7DC] bg-[url('/background.svg')] bg-cover bg-no-repeat">

      <div className="flex flex-col items-center text-center justify-center gap-[20px] sm:gap-[41px] select-none">
        {step === 'userType' && (
          <>
            <Header />
            <Image
              src="/create-account/user-type.svg"
              alt="user-type"
              width={315}
              height={315}
              className="w-[315px] h-auto drop-shadow-[0px_8px_16px_rgba(196,85,0,0.35)] mb-[20px]"
              priority
            />
            <div className="flex flex-col">
              <h1 className="font-extrabold text-[24px] sm:text-4xl text-[#F90] [text-shadow:0_0_4px_rgba(255,153,0,0.35)] leading-tight">
                {"Get a "}<span className="text-[#C45500]">{"parent"}</span>{" to set up"}
                <br />{" the app"}
              </h1>
            </div>
            <div className="flex gap-[10px] w-[311px] sm:w-[330px] justify-center">
              <Button variant="custom" onClick={() => setStep('child')} className="text-[16px]">
                {"I'm a CHILD"}
              </Button>
              <Button variant="custom" href="create-account" className="text-[16px]">
                {"I'm a PARENT"}
              </Button>
            </div>
          </>
        )}
        {step === 'child' && (
          <>
            <Header showBackButton={false} />
            <Image
              src="/create-account/if-child.svg"
              alt="user-type"
              width={315}
              height={315}
              className="w-[315px] h-auto drop-shadow-[0px_8px_16px_rgba(196,85,0,0.35)]"
            />
            <div className="flex flex-col">
              <h1 className="font-extrabold text-[24px] sm:text-4xl text-[#F90] [text-shadow:0_0_4px_rgba(255,153,0,0.35)] leading-tight">{"Ask a "}<span className="text-[#C45500]">{"parent"}</span>{" to set up"}<br />{" the app"}</h1>
            </div>
            <div className="flex gap-[10px] w-[84px] justify-center">
              <Button variant="custom" className="text-[16px]" href="/">{"OKAY"}</Button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
