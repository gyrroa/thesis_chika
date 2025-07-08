'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'    // ← import this
import { Button } from '@/components/ui/button'
import { Header } from '@/components/ui/header'
import Image from 'next/image'
import { AgeSelector } from '@/components/ui/age-selector-input'
import ToggleSwitch from '@/components/ui/gender-switch'

export default function Home() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    })
    const [selectedAge, setSelectedAge] = useState(4)
    const [isGirl, setIsGirl] = useState(false)
    const [agreedToTerms, setAgreedToTerms] = useState(false)
    const [showTermsError, setShowTermsError] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!agreedToTerms) {
            setShowTermsError(true)
            return
        }
        setShowTermsError(false)

        console.log('Nickname:', form.name)
        console.log('Age:', selectedAge)
        console.log('Gender:', isGirl ? 'Girl' : 'Boy')
        console.log('Agreed to Terms:', agreedToTerms)
        // …send to your API…
        router.push('/onboarding');
    }
    return (
        <main className="items-center justify-items-center w-dvw max-h-dvh font-[family-name:var(--font-sans)] bg-[#F2E7DC] bg-[url('/background.svg')] bg-cover bg-no-repeat">
            <Header />
            <div className="w-dvw h-dvh flex flex-col items-center text-center justify-center select-none pt-[60px] sm:pt-0">
                <div className='flex sm:w-[500px] sm:max-h-fit grow bg-[#FFFDF2] sm:rounded-[45px] rounded-t-[45px] text-[#C45500] [box-shadow:0px_-1px_24.1px_0px_rgba(196,85,0,0.30)] w-full'>
                    <form onSubmit={handleSubmit} className="flex flex-col text-[16px] max-w-[311px] mx-auto gap-[47px] sm:py-[50px] pt-[50px]">
                        <div className='flex flex-col gap-[25px]'>
                            <h2 className="text-2xl font-bold">{"Register Your Child"}</h2>
                            <div className='flex flex-col gap-[26px]'>

                                <div className="relative w-full">
                                    <div className="absolute top-1/2 left-1 transform -translate-y-1/2 w-9 h-9 rounded-[25px] bg-[linear-gradient(180deg,_#F90_0%,_#C45500_100%)] flex items-center">
                                        <Image
                                            src="/create-account/name.svg"
                                            alt="user-type"
                                            width={15}
                                            height={14}
                                            className="m-auto relative"
                                            priority
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                        className="h-11 w-full border border-[#F90] placeholder-[rgba(255,153,0,0.5)] pl-[51] pr-[5px] py-2 rounded-[25px]"
                                        placeholder="Your Child's Nickname"
                                    />
                                </div>

                                <div className="relative w-full">
                                    <ToggleSwitch checked={isGirl} onChange={setIsGirl} />
                                </div>

                            </div>
                        </div>
                        <AgeSelector
                            name="age"
                            min={2}
                            max={8}
                            defaultValue={4}
                            onChange={setSelectedAge}
                        />
                        <div className="flex flex-col gap-[20px]">
                            <label className="flex items-center justify-center space-x-2">
                                <label className="relative flex items-center justify-center">
                                    <input
                                        type="checkbox"
                                        className="peer appearance-none w-4 h-4 rounded-[7.2px] border border-[#F90] bg-white ring-0 ring-[#F90] cursor-pointer"
                                        checked={agreedToTerms}                     // ← controlled
                                        onChange={e => setAgreedToTerms(e.target.checked)}
                                    />
                                    <svg
                                        className="absolute w-3 h-3 text-[#F90] hidden peer-checked:block pointer-events-none"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </label>
                                <span className="text-[12px]">
                                    I agree to the{' '}
                                    <span className="text-[#F90] underline font-bold">Terms and Conditions.</span>
                                </span>
                            </label>
                            <Button variant="default" type="submit">
                                REGISTER CHILD
                            </Button>
                            {/* ← new: error message */}
                            {showTermsError && (
                                <p className="text-[#F90] text-sm">
                                    You must agree to the terms and conditions before submitting.
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
