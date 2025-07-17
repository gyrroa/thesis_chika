import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="items-center justify-items-center min-h-dvh bg-[url('/background.svg')] bg-cover bg-no-repeat">
      <div className="flex flex-col items-center text-center justify-center gap-[20px] sm:gap-[41px] select-none pt-[120px]">
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
            <Button variant="default" href="user-type">
              {"CREATE AN ACCOUNT"}
            </Button>
            <Button variant="custom" href="login">{"LOG IN"}</Button>
          </div>
        </>
      </div>
    </main>
  );
}
