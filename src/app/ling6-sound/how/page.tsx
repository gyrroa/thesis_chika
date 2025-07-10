'use client';

import { Button } from '@/components/ui/button';
import { Header } from '@/components/ui/header';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();
    const handleSubmit = (e: React.FormEvent) => {
        router.push('test');
    }
    return (
        <main className="flex items-center justify-center justify-items-center min-h-dvh  bg-[url('/background.svg')] bg-cover bg-no-repeat">

            <div className="flex flex-col items-center text-center justify-center gap-[30px] px-[30px] select-none leading-tight">
                <Header showBackButton={false} />
                <div className="flex flex-col gap-[5px]">
                    <h1 className="font-bold text-[32px] text-[#C45500] [text-shadow:0_0_4px_rgba(255,153,0,0.35)]">{"Ling6 Sound Test"}</h1>
                    <h1 className="font-extrabold text-[24px] text-[#F90] [text-shadow:0_0_4px_rgba(255,153,0,0.35)]">
                        {"How It Works"}
                    </h1>
                </div>
                <div className="h-[178px] sm:h-full w-full rounded-[10px] border-2 border-[#F90] overflow-hidden aspect-video">
                    <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/eSCjhtvbYck?cc_load_policy=1&cc_lang_pref=en&modestbranding=1&rel=0&controls=1"
                        title="CHIKA Intro"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>

                <p className='text-[16px] font-medium text-[#F90]'>{"Before we begin, watch this short video showing "}<span className='font-bold'>{"how to check your child’s hearing"}</span>{" with the Ling6 sounds."}</p>
                <div className="flex gap-[10px] justify-center">
                    <Button className="text-[16px]" onClick={handleSubmit}>
                        {"START TEST"}
                    </Button>
                </div>
                <h1 className='text-[#C45500] text-[16px] font-medium'>{"Skip sound test? "}<span className='underline text-[#F90]'>{"Click here"}</span></h1>
            </div>
        </main>
    );
}
