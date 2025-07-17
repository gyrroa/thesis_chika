'use client'

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const handleRoute = async (href = '/') => {
    try {
      await router.prefetch(href)
    } catch (err) {
      console.warn('Prefetch failed, navigating anyway:', err)
    }
    router.push(href)
  }

  return (
    <main className="flex justify-center min-h-dvh bg-[url('/background.svg')] bg-cover bg-no-repeat sm:pt-0 py-[30px]">
      <div className="flex flex-col items-center text-center gap-[20px] sm:gap-[41px] select-none m-0 sm:m-auto">
        <>
          <Image
            src="/create-account/logo-with-text.svg"
            alt="Logo"
            width={216}
            height={336}
            className="w-[216px] sm:w-[330px] h-auto"
            priority
          />
          <div className="flex flex-col">
            <h1 className="font-extrabold text-[19px] sm:text-4xl text-[#C45500] [text-shadow:0_0_4px_rgba(255,153,0,0.35)]">
              {"Speak Clearly, Learn Playfully"}
            </h1>
            <p className="font-medium text-[16px] sm:text-2xl text-[#FF9900]">
              {"Boost your child’s speech from day"}<br />
              {"one with fun, AI-powered practice."}
            </p>
          </div>
          <div className="flex flex-col gap-[20px] w-[311px] sm:w-[330px]">
            <Button variant="default" onClick={() => handleRoute("user-type")}>
              {"CREATE AN ACCOUNT"}
            </Button>
            <Button variant="custom" onClick={() => handleRoute("login")}>
              {"LOG IN"}
            </Button>
          </div>
        </>
      </div>
    </main>
  );
}
