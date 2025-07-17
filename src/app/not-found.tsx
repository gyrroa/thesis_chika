// app/not-found.tsx
import { Button } from '@/components/ui/button'
import { Header } from '@/components/ui/header'
import Image from 'next/image'

export default function NotFound() {
  return (
    <main className="flex items-center justify-items-center min-h-dvh bg-[url('/background.svg')] bg-cover bg-no-repeat">
      <Header showBackButton={false} />
      <div className="flex flex-col items-center text-center justify-center gap-[22px] m-auto">
        <Image
          src="/not-found.svg"
          alt="user-type"
          width={297}
          height={207}
          priority
        />
        <div className='flex flex-col gap-[5px] font-bold'>
          <h1 className='text-[32px] text-[#C45500]'>{"Uh-oh!"}</h1>
          <p className='text-[24px] text-[#C45500]'>{"Looks like we got lost."}</p>
          <p className='text-[20px] text-[#F90]'>{"No worries—let’s head back!"}</p>
        </div>
        <Button href="/" className='w-fit'>
          {"BACK TO CHIKA START"}
        </Button>
      </div>

    </main>
  )
}
