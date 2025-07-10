'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/ui/header';
import { useRouter } from 'next/navigation';
import { SoundCard } from '@/components/ui/ling6-sound-card';

export default function Home() {
  const router = useRouter();

  const sounds = [
    { id: 'ah', label: 'ah', src: '/ling6-sound/ah.svg' },
    { id: 'oo', label: 'oo', src: '/ling6-sound/oo.svg' },
    { id: 'eeee', label: 'eeee', src: '/ling6-sound/eeee.svg' },
    { id: 'sh', label: 'sh', src: '/ling6-sound/sh.svg' },
    { id: 'ssss', label: 'ssss', src: '/ling6-sound/ssss.svg' },
    { id: 'mmm', label: 'mmm', src: '/ling6-sound/mmm.svg' },
  ];

  const handleFail = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('failed');
  };
  const handlePass = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/registration/create-account');
  };

  return (
    <main className="flex items-center justify-center min-h-dvh bg-[url('/background.svg')] bg-cover bg-no-repeat">
      <div className="flex flex-col items-center text-center justify-center gap-[30px] px-[30px] select-none leading-tight">
        <Header />

        <div className="flex flex-col gap-[5px] text-[#C45500]">
          <h1 className="font-bold text-[32px] [text-shadow:0_0_4px_rgba(255,153,0,0.35)]">
            {"Ling6 Sound Test"}
          </h1>
          <h2 className="font-normal text-[24px] [text-shadow:0_0_4px_rgba(255,153,0,0.35)]">
            {"Your Turn"}
          </h2>
        </div>

        <div className="grid grid-cols-3 grid-rows-2 gap-[18px] h-auto w-full">
          {sounds.map(({ id, label, src }) => (
            <SoundCard
              key={id}
              label={label}
              src={src}
            />
          ))}
        </div>

        <p className="font-normal text-[14px] text-[#C45500] px-[10px]">
          {"Say the sounds in any order you like. Tap below if your child hears and/or repeats all sounds."}
        </p>

        <div className="flex gap-[10px] justify-center">
          <Button className="text-[16px]" variant="custom" onClick={handleFail}>
            {"FAILED"}
          </Button>
          <Button className="text-[16px]" onClick={handlePass}>
            {"PASSED"}
          </Button>
        </div>
      </div>
    </main>
  );
}
