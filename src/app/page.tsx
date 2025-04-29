import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen font-[family-name:var(--font-sans)]">
      <main className="flex flex-col items-center text-center justify-center h-screen gap-[23.5px] md:gap-[41px] select-none">
        <img src="create-account/logo-with-text.svg" alt="Logo" className="w-[216px] md:w-[330px] h-auto" />
        <div className="flex flex-col">
          <h1 className="font-extrabold text-[19px] md:text-4xl text-[#C45500] [text-shadow:0_0_4px_rgba(255,153,0,0.35)] leading-tight">Speak Clearly, Learn Playfully</h1>
          <p className="font-medium text-[16px] md:text-2xl text-[#FF9900] md:text-[#C45500] leading-tight">Boost your child’s speech from day<br />one with fun, AI-powered practice.</p>
        </div>
        <div className="flex flex-col gap-[20px] w-[311px] md:w-[330px] ">
          <Button variant="default" href="/user-type">CREATE AN ACCOUNT</Button>
          <Button variant="custom">LOG IN</Button>
        </div>
      </main>
    </div>
  );
}
