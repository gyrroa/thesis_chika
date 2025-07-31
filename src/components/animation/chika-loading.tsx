'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ChikaLoading() {
  const [frame, setFrame] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev % 8) + 1); // Loop 1 → 8
    }, 100); // 100ms per frame

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div
      className="absolute inset-0 flex bg-[black]/80 w-dvw h-dvh z-20 text-center select-none"
    >
      <div
        className="m-auto relative flex flex-col gap-[20px] rounded-[45px] p-[30px] w-fit h-fit sm:max-w-[371px]"
      >
        <div className="text-[#F90] text-[20px] font-medium flex flex-col gap-[10px]">
          <Image
            src={`/animation/Order=${frame}.svg`}
            alt={`Frame ${frame}`}
            width={200}
            height={200}
            priority
          />
        </div>
      </div>
    </div>
  );
}
