'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Header } from '@/components/ui/header';
import Image from 'next/image';
import ProgressBar from '@/components/ui/progress-bar';
import { useVad } from '@/lib/customVad';

// Extendable MediaRecorder with WAV encoder
import { MediaRecorder as EMR, IMediaRecorder, register } from 'extendable-media-recorder';
import { connect as wavConnect } from 'extendable-media-recorder-wav-encoder';
import { usePreAssessment } from '@/features/exercises/context/PreAssessmentContext';
import { useSubmitAttempt } from '@/features/exercises/hooks';
import ChikaListening from '@/components/animation/chika-listening';
import { useQueryClient } from '@tanstack/react-query';
import { User } from '@/features/auth/types';
import { useUserChildren } from '@/features/users/hooks';
import { AttemptV2Response } from '@/features/exercises/types';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import ChikaLoading from '@/components/animation/chika-loading';

export default function PreAssessment() {
    const router = useRouter();
    // child id
    const qc = useQueryClient();
    const user = qc.getQueryData<User>(['auth', 'user']);
    const { data: children } = useUserChildren(user?.id ?? '');
    const childId = children?.[0]?.id ?? '';

    // get your pre-assessment state from context
    const { data: preAssessment, isLoading } = usePreAssessment();

    // pick the first item (or nothing)
    const [idx, setIdx] = useState(0);
    const item = preAssessment?.items?.[idx];
    const imgSrc = item?.word.image_url ?? '';
    const audioSrc = item?.word.audio_url ?? '';
    const word = item?.word.text ?? '';
    const stressedWord = item?.word.stress ?? '';
    const displayStressedWord = stressedWord.replace(/-/g, '');
    const syll = item?.word.syllables ?? '';
    const transl = item?.word.translation ?? '';
    const max = preAssessment?.items_count ?? 1;
    const [attemptedWord, setAttemptedWord] = useState<string>("");
    const [attemptedStressedWord, setAttemptedStressedWord] = useState<string>("");
    // modals
    const [correct, setCorrect] = useState(false);
    const [incorrect, setIncorrect] = useState(false);
    const [incorrectStress, setIncorrectStress] = useState(false);
    const [finished, setFinished] = useState(false);

    // recorder refs & state
    const [isRecording, setIsRecording] = useState(false);
    const [isPulsing, setIsPulsing] = useState(false);
    const mediaRef = useRef<IMediaRecorder | null>(null);
    const chunks = useRef<Blob[]>([]);

    // prepare WAV once
    const wavReady = useRef<Promise<void>>(Promise.resolve());
    useEffect(() => {
        wavReady.current = (async () => {
            try {
                const broker = await wavConnect();
                await register(broker);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    console.warn('WAV encoder registration skipped:', err.message);
                } else {
                    console.warn('WAV encoder registration skipped:', err);
                }
            }
        })();
    }, []);

    // VAD hook
    const endRecording = useCallback(() => {
        mediaRef.current?.stop();
        setIsRecording(false);
        setIsPulsing(false);
    }, []);  // no deps → stable

    // const { startVad, stopVad, isSpeaking } = useVad(
    const { startVad, stopVad, speechDetectedRef } = useVad(
        endRecording,
        { threshold: 0.02, silenceDelay: 1200 }
    );

    const [isPlaying, setIsPlaying] = useState(false);
    // play word sound
    const playSound = () => {
        const audio = new Audio(audioSrc);
        setIsPlaying(true);
        audio.play();
        audio.onended = () => setIsPlaying(false);
    };
    // play word sound
    const playNextSound = () => {
        const audio = new Audio(preAssessment?.items?.[idx + 1]?.word.audio_url ?? "");
        audio.play().catch((err) => {
            console.error('Audio playback failed:', err);
        });
    };
    // Play first time
    useEffect(() => {
        if (idx === 0 && audioSrc) {
            const audio = new Audio(audioSrc);
            audio.play().catch((err) => {
                console.warn("Autoplay blocked or failed:", err);
            });
        }
    }, [idx, audioSrc]);
    // Next Test
    const handleNextTest = () => {
        if (idx + 1 < max) {
            setIdx(idx + 1);
            playNextSound();
        } else {
            setFinished(true);
        }
        setCorrect(false);
        setIncorrect(false);
        setIncorrectStress(false);
    }

    // Handle Result
    const handleResult = (resp: AttemptV2Response) => {
        setAttemptedWord(resp?.attempt_answer);
        if (resp?.correct && resp?.stress_correct) {
            if (idx + 1 < max) {
                setCorrect(true);
            } else {
                setFinished(true);
            }
        }
        else if (resp?.correct && !resp?.stress_correct) {
            setAttemptedStressedWord(resp?.attempt_answer_stressed);
            setIncorrectStress(true);
        }
        else {
            setIncorrect(true);
        }
    }
    const {
        mutate: submitAttempt,
        // mutateAsync,
        // data,
        isPending,
        // isError,
        // error,
    } = useSubmitAttempt();

    const [errorMic, setErrorMic] = useState(false);
    // mic handler
    const handleMic = async () => {
        await wavReady.current;
        setErrorMic(false);
        if (!isRecording) {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new EMR(stream, { mimeType: 'audio/wav' });
            mediaRef.current = recorder;
            chunks.current = [];

            // reset speech flag
            speechDetectedRef.current = false;

            recorder.ondataavailable = (e) => {
                if (e.data.size) chunks.current.push(e.data);
            };

            recorder.onstop = () => {
                stream.getTracks().forEach(t => t.stop());
                stopVad();
                setIsRecording(false);
                setIsPulsing(false);

                // <-- new guard -->
                if (!speechDetectedRef.current) {
                    setErrorMic(true);
                    return;
                }

                const wavBlob = new Blob(chunks.current, { type: 'audio/wav' });
                const wavFile = new File([wavBlob], `${word}.wav`, { type: 'audio/wav' });

                submitAttempt(
                    {
                        query: {
                            child_id: childId,
                            assessment_item_id: item?.item ?? 0,
                            attempt_type: 'static',
                        },
                        payload: { file: wavFile },
                    },
                    {
                        onSuccess: (resp) => handleResult(resp),
                        onError: (err) => console.error(err),
                    }
                );
            };

            recorder.start();
            await startVad(stream);
            setIsRecording(true);
            setIsPulsing(true);
        } else {
            mediaRef.current?.stop();
            stopVad();
            setIsRecording(false);
            setIsPulsing(false);
        }
    };

    // tooltip behavior
    const [showTooltip, setShowTooltip] = useState(false);
    useEffect(() => {
        if (!showTooltip) return;
        const t = setTimeout(() => setShowTooltip(false), 2000);
        return () => clearTimeout(t);
    }, [showTooltip]);

    // dynamic font sizing
    const fontSize = `${Math.max(20, 32 - (word.length - 4) * 1.5)}px`;

    const [backModal, setBackModal] = useState(false);

    // SFX
    const playSoundFX = (src: string) => {
        const audio = new Audio(src);
        audio.play().catch((err) => {
            console.error('Audio playback failed:', err);
        });
    };

    useEffect(() => {
        if (isPending) {
            playSoundFX("/sfx/HOLD ON.ogg");
        }
    }, [isPending]);


    useEffect(() => {
        if (correct) {
            playSoundFX("/sfx/GREAT JOB.ogg");
        }
    }, [correct]);

    useEffect(() => {
        if (incorrect) {
            playSoundFX("/sfx/ERROR.ogg");
        }
    }, [incorrect]);

    useEffect(() => {
        if (incorrectStress) {
            playSoundFX("/sfx/ALMOST THERE.ogg");
        }
    }, [incorrectStress]);

    return (
        <main className="flex flex-col items-center justify-center min-h-dvh bg-[url('/background.svg')] bg-cover bg-no-repeat gap-[8px]">
            <Header showBackButton={true} onBackClick={() => setBackModal(true)} />
            {/* Progress Bar */}
            <ProgressBar value={idx + 1} max={max} />
            {isLoading && (
                <ChikaLoading />
            )}
            {isPending &&
                <ChikaListening />
            }
            {backModal &&
                <div className='absolute h-screen w-screen bg-black/50 items-center justify-center flex z-10'>
                    <div className='flex flex-col gap-[20px] rounded-[45px] bg-[#FFFDF2] [box-shadow:0_-1px_24.1px_0_rgba(196,85,0,0.3)] p-[30px] z-50 items-center'>
                        <Image
                            src={`/chika/sad.png`}
                            alt={`chika`}
                            width={240}
                            height={240}
                            priority
                        />
                        {/* Text */}
                        <div className='w-[311px] text-center flex flex-col gap-[10px]'>
                            <h1 className='text-[#C45500] text-[32px] font-bold [text-shadow:0_0_4px_rgba(255,153,0,0.35)]'>{"Leaving already?"}</h1>
                            <p className='text-[#FF9900] text-[20px] font-medium'>{"It’s okay! Your progress is saved. But this round starts over."}</p>
                            <p className='text-[#FF9900] text-[20px] font-medium'>{"Still want to go back?"}</p>
                        </div>
                        <div className='flex w-full gap-[20px]'>
                            <Button variant={"custom"} onClick={() => setBackModal(false)}>{"CANCEL"}</Button>
                            <Button onClick={() => router.back()} soundType={"confirm"} >{"YES"}</Button>
                        </div>
                    </div>
                </div>
            }
            {/* Correct Result */}
            {correct &&
                <div className='absolute h-screen w-screen bg-black/50 items-center justify-center flex z-10'>
                    <div className='flex flex-col gap-[20px] rounded-[45px] bg-[#FFFDF2] [box-shadow:0_-1px_24.1px_0_rgba(196,85,0,0.3)] p-[30px] z-50 items-center'>
                        <Image
                            src={`/chika/hapi.svg`}
                            alt={`hapi`}
                            width={157}
                            height={157}
                            priority
                            className='max-w-[157px] max-h-[161px]'
                        />
                        <div className='w-full text-center flex flex-col gap-[10px]'>
                            <h1 className='text-[#C45500] text-[32px] font-bold [text-shadow:0_0_4px_rgba(255,153,0,0.35)]'>Great job!</h1>
                            <p className='text-[#FF9900] text-[20px] font-medium'>You said it perfectly.<br /><b>CHIKA is proud of you!</b></p>
                            <p className='text-[#FF9900] text-[20px] font-medium'> Ready for the next word?</p>
                        </div>
                        <Button className='w-[311px]' onClick={handleNextTest} soundType='confirm'>NEXT WORD</Button>
                        <Button variant={'custom'} onClick={() => setCorrect(false)}>TRY AGAIN</Button>
                    </div>
                </div>
            }
            {/* Inorrect Result */}
            {incorrect &&
                <div className='absolute h-screen w-screen bg-black/50 items-center justify-center flex z-10'>
                    <div className='flex flex-col gap-[20px] rounded-[45px] bg-[#FFFDF2] [box-shadow:0_-1px_24.1px_0_rgba(196,85,0,0.3)] p-[30px] z-50 items-center'>
                        <Image
                            src={`/chika/angy.svg`}
                            alt={`angy`}
                            width={157}
                            height={157}
                            priority
                            className='max-w-[157px] max-h-[161px]'
                        />
                        <div className='text-center flex flex-col gap-[10px] w-[311px]'>
                            <h1 className='text-[#C45500] text-[32px] font-bold [text-shadow:0_0_4px_rgba(255,153,0,0.35)]'>{"Oops! That didn’t sound quite right."}</h1>
                            <p className='text-[#FF9900] text-[20px] font-medium'>{`You said: `}<b>{`“${attemptedWord}”`}</b><br />{` But the word is: `}<b>{`“${word}”`}</b></p>
                            <p className='text-[#FF9900] text-[20px] font-medium'> {"Let’s try again together — you’re getting closer!"}</p>
                        </div>
                        <Button onClick={() => setIncorrect(false)}>TRY AGAIN</Button>
                        <Button variant={"custom"} onClick={handleNextTest}>SKIP</Button>
                    </div>
                </div >
            }
            {/* Inorrect Stress */}
            {incorrectStress &&
                <div className='absolute h-screen w-screen bg-black/50 items-center justify-center flex z-10'>
                    <div className='flex flex-col gap-[20px] rounded-[45px] bg-[#FFFDF2] [box-shadow:0_-1px_24.1px_0_rgba(196,85,0,0.3)] p-[30px] z-50 items-center'>
                        <Image
                            src={`/chika/angy.svg`}
                            alt={`angy`}
                            width={157}
                            height={157}
                            priority
                            className='max-w-[157px] max-h-[161px]'
                        />
                        <div className='text-center flex flex-col gap-[10px] w-[311px]'>
                            <h1 className='text-[#C45500] text-[32px] font-bold [text-shadow:0_0_4px_rgba(255,153,0,0.35)]'>{"Almost there!"}</h1>
                            <p className='text-[#FF9900] text-[20px] font-medium'>{`You said: `}<b>{`“${attemptedStressedWord}”`}</b><br />{` But the word is: `}<b>{`“${displayStressedWord}”`}</b></p>
                            <p className='text-[#FF9900] text-[20px] font-medium'> {"Try putting the stress on the right syllable!"}</p>
                        </div>
                        <Button onClick={() => setIncorrectStress(false)}>TRY AGAIN</Button>
                        <Button variant={"custom"} onClick={handleNextTest}>SKIP</Button>
                    </div>
                </div >
            }
            {/* Inorrect Stress */}
            {finished &&
                <div className='absolute h-screen w-screen bg-black/50 items-center justify-center flex z-10'>
                    <div className='flex flex-col gap-[20px] rounded-[45px] bg-[#FFFDF2] [box-shadow:0_-1px_24.1px_0_rgba(196,85,0,0.3)] p-[30px] z-50 items-center'>
                        <Image
                            src={`/chika/hapi.svg`}
                            alt={`angy`}
                            width={157}
                            height={157}
                            priority
                            className='max-w-[157px] max-h-[161px]'
                        />
                        <div className='text-center flex flex-col gap-[10px] w-[311px]'>
                            <h1 className='text-[#C45500] text-[32px] font-bold [text-shadow:0_0_4px_rgba(255,153,0,0.35)]'>{"Yay! You finished all the words!"}</h1>
                            <p className='text-[#FF9900] text-[20px] font-medium'>{`CHIKA is super proud of you for practicing so well today.`}</p>
                            <p className='text-[#FF9900] text-[20px] font-medium'> {"That was awesome — see you again soon, "}<b>{"Word Champ!"}</b></p>
                        </div>
                        <Button onClick={() => router.push("/home")}>BACK HOME</Button>
                    </div>
                </div >
            }
            <div className="flex flex-col items-center text-center justify-center gap-[50px] select-none leading-tight">
                <div className="flex flex-col gap-[25px] bg-[linear-gradient(180deg,_#F90_0%,_#C45500_100%)] rounded-[45px] w-[377px] h-[391px] py-[30px] px-[33px] [box-shadow:0px_127px_36px_0px_rgba(196,85,0,0.01),0px_81px_33px_0px_rgba(196,85,0,0.05),0px_46px_27px_0px_rgba(196,85,0,0.18),0px_20px_20px_0px_rgba(196,85,0,0.31),0px_5px_11px_0px_rgba(196,85,0,0.36)]">
                    <h1 className="font-bold text-[24px] [text-shadow:0_0_16px_#C45500] text-[#FFFDF2] outline-text">
                        {"Can you say the word? Let's hear it!"}
                    </h1>
                    <div className='bg-[#FFFDF2] rounded-[10px] h-full w-full border-2 border-[#CB5D00] pt-[15px] flex flex-col justify-between'>
                        <div className='flex flex-col items-center'>
                            <Image
                                src={imgSrc}
                                alt={word}
                                width={132}
                                height={132}
                                className="m-auto w-[132px] h-[132px] filter drop-shadow-[0px_0px_16px_rgba(196,85,0,0.35)]"
                                priority
                                loading='eager'
                            />
                            <div
                                className={`relative flex items-center justify-center cursor-pointer group ${showTooltip ? 'show-tooltip' : ''}`}
                                style={{ fontSize }}
                                onClick={() => setShowTooltip(true)}
                            >
                                {/* Translation Tooltip */}
                                <div
                                    className={`cursor-default absolute -top-10 z-10 rounded-[10px] px-[15px] py-[10px] whitespace-nowrap transition-all duration-300 ease-in-out bg-[#C45500]/0 opacity-0 pointer-events-none group-[.show-tooltip]:bg-[#C45500]/90 group-[.show-tooltip]:opacity-100 group-[.show-tooltip]:pointer-events-auto group-[.show-tooltip]:border-[#C45500]/90`}
                                >
                                    <span className="text-[#FFFDF2] text-[14px] font-bold text-center block leading-tight uppercase">
                                        {transl.split('').map((char, index) => (
                                            <span
                                                key={index}
                                                className={index < transl.length - 1 ? 'tracking-[3px]' : ''}
                                            >
                                                {char}
                                            </span>
                                        ))}
                                    </span>

                                    {/* Tooltip Triangle */}
                                    <div
                                        className={`absolute left-1/2 top-full -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent transition-colors duration-300 ${showTooltip ? 'border-t-[#C45500]/90' : 'border-t-[#C45500]/0'}`}
                                    />
                                </div>
                                {/* Word */}
                                <h1 className="text-[#C45500] tracking-[7px] text-center">
                                    {"["}
                                    <span className="underline-custom-dash inline-block">{syll}</span>
                                </h1>
                                <h1 className='text-[#C45500]'>{"]"}</h1>
                            </div>
                        </div>
                        <div className="flex items-center justify-center rounded-b-[10px] bg-[#F2E7DC] h-[50px]">
                            <div
                                onClick={playSound}
                                className={`
          border-[#F90] bg-[#FFFDF2] border-2 w-[35px] h-[35px] pl-[3px] rounded-full flex items-center justify-center cursor-pointer sound-container
          ${isPlaying ? 'playing' : ''}
        `}
                            >
                                <div className="icon ml-[2px]">
                                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                                        <path d="M12 7L0.75 13.4952V0.504809L12 7Z" fill="#FF9900" />
                                    </svg>
                                </div>
                                <div className="wave sound-wave">
                                    <span></span><span></span><span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* MIC */}
                <button
                    onClick={handleMic}
                    className="flex items-center justify-center w-[116px] h-[116px] cursor-pointer overflow-visible"
                >
                    {/* outer circle: either static 65×65, or animating pulse */}
                    <div
                        className={
                            `flex items-center justify-center rounded-full overflow-visible transition-colors duration-300 ease-in-out ` +
                            (isPulsing
                                ? 'pulse-outer bg-[#a3da9f]'
                                : `w-[116px] h-[116px] ${errorMic ? "bg-[#f79f7c]" : "bg-[#fcd497]"}`)
                        }
                    >
                        {/* middle circle */}
                        <div
                            className={
                                `flex items-center justify-center rounded-full overflow-visible transition-colors duration-300 ease-in-out ` +
                                (isPulsing
                                    ? 'pulse-middle bg-[#6bcf79]'
                                    : `w-[95px] h-[95px] ${errorMic ? "bg-[#fc815b]" : "bg-[#ffc363]"}`)
                            }
                        >

                        </div>
                    </div>
                    {/* Inner circle stays fixed */}
                    <div className="absolute flex items-center justify-center w-[65px] h-[65px] rounded-full bg-[#F9F9F9] shadow-md">
                        {/* Microphone Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill={errorMic ? '#FF3300' : isPulsing ? '#00B527' : '#FF9900'} >
                            <g clipPath="url(#clip0_468_5155)">
                                <path d="M14.8069 21.068C17.7532 21.068 20.1503 18.6709 20.1503 15.7246V5.91712C20.1503 2.97075 17.7532 0.57373 14.8069 0.57373C11.8605 0.57373 9.46349 2.97075 9.46349 5.91712V15.7246C9.46349 18.6709 11.8605 21.068 14.8069 21.068ZM14.8069 1.71062C17.1264 1.71062 19.0134 3.59759 19.0134 5.91712V10.615H10.6004V5.91712C10.6004 3.59759 12.4873 1.71062 14.8069 1.71062ZM10.6004 11.7519H19.0134V15.7246C19.0134 18.0441 17.1264 19.9311 14.8069 19.9311C12.4873 19.9311 10.6004 18.0441 10.6004 15.7246V11.7519Z" />
                                <path d="M13.4237 8.03801H16.19C16.504 8.03801 16.7584 7.78355 16.7584 7.46957C16.7584 7.15559 16.504 6.90112 16.19 6.90112H13.4237C13.1097 6.90112 12.8553 7.15559 12.8553 7.46957C12.8553 7.78355 13.1097 8.03801 13.4237 8.03801Z" />
                                <path d="M13.4237 5.91961H16.19C16.504 5.91961 16.7584 5.66514 16.7584 5.35116C16.7584 5.03718 16.504 4.78271 16.19 4.78271H13.4237C13.1097 4.78271 12.8553 5.03718 12.8553 5.35116C12.8553 5.66514 13.1097 5.91961 13.4237 5.91961Z" />
                                <path d="M22.0848 15.156C21.771 15.156 21.5163 15.4105 21.5163 15.7245C21.5163 19.424 18.5064 22.4339 14.8069 22.4339C11.1073 22.4339 8.09745 19.424 8.09745 15.7245C8.09745 15.4105 7.84298 15.156 7.529 15.156C7.21502 15.156 6.96056 15.4105 6.96056 15.7245C6.96056 19.4757 9.60716 22.6202 13.1309 23.39V26.2638H13.0862C11.517 26.2638 10.2404 27.5403 10.2404 29.1096C10.2404 29.4235 10.4949 29.678 10.8089 29.678H18.8049C19.1188 29.678 19.3733 29.4235 19.3733 29.1096C19.3733 27.5406 18.0968 26.2638 16.5275 26.2638H16.4829V23.39C20.0068 22.6202 22.6532 19.4757 22.6532 15.7245C22.6532 15.4105 22.3987 15.156 22.0848 15.156ZM18.1394 28.5411H11.4746C11.7093 27.8774 12.343 27.4007 13.0862 27.4007H16.5278C17.2707 27.4007 17.9045 27.8774 18.1394 28.5411ZM15.346 26.2638H14.2677V23.5519C14.446 23.5641 14.6257 23.5708 14.8069 23.5708C14.9881 23.5708 15.1677 23.5641 15.346 23.5519V26.2638Z" />
                                <path d="M3.0969 5.8833C2.78293 5.8833 2.52846 6.13777 2.52846 6.45175V12.0005C2.52846 12.3143 2.78293 12.569 3.0969 12.569C3.41088 12.569 3.66535 12.3143 3.66535 12.0005V6.45175C3.66535 6.13777 3.41088 5.8833 3.0969 5.8833Z" />
                                <path d="M7.64446 11.1483C7.95844 11.1483 8.21291 10.8938 8.21291 10.5798V7.87216C8.21291 7.55818 7.95844 7.30371 7.64446 7.30371C7.33049 7.30371 7.07602 7.55818 7.07602 7.87216V10.5798C7.07602 10.8938 7.33049 11.1483 7.64446 11.1483Z" />
                                <path d="M0.823122 3.64331C0.509145 3.64331 0.254677 3.89778 0.254677 4.21176V13.6668C0.254677 13.9808 0.509145 14.2353 0.823122 14.2353C1.1371 14.2353 1.39157 13.9808 1.39157 13.6668V4.21176C1.39157 3.89778 1.1371 3.64331 0.823122 3.64331Z" />
                                <path d="M5.37068 5.30981C5.05671 5.30981 4.80224 5.56428 4.80224 5.87826V13.5618C4.80224 13.8758 5.05671 14.1303 5.37068 14.1303C5.68466 14.1303 5.93913 13.8758 5.93913 13.5618V5.87826C5.93913 5.56428 5.68466 5.30981 5.37068 5.30981Z" />
                                <path d="M26.5168 5.8833C26.2029 5.8833 25.9484 6.13777 25.9484 6.45175V12.0005C25.9484 12.3143 26.2029 12.569 26.5168 12.569C26.8308 12.569 27.0853 12.3143 27.0853 12.0005V6.45175C27.0853 6.13777 26.8308 5.8833 26.5168 5.8833Z" />
                                <path d="M21.9693 11.1483C22.2833 11.1483 22.5377 10.8938 22.5377 10.5798V7.87216C22.5377 7.55818 22.2833 7.30371 21.9693 7.30371C21.6553 7.30371 21.4008 7.55818 21.4008 7.87216V10.5798C21.4008 10.8938 21.6553 11.1483 21.9693 11.1483Z" />
                                <path d="M28.7906 3.64331C28.4766 3.64331 28.2222 3.89778 28.2222 4.21176V13.6668C28.2222 13.9808 28.4766 14.2353 28.7906 14.2353C29.1046 14.2353 29.3591 13.9808 29.3591 13.6668V4.21176C29.3591 3.89778 29.1046 3.64331 28.7906 3.64331Z" />
                                <path d="M24.2431 12.9937C24.0936 12.9937 23.9468 13.054 23.8412 13.1597C23.7355 13.2661 23.6746 13.4122 23.6746 13.5621C23.6746 13.7118 23.7355 13.8583 23.8412 13.964C23.9468 14.0699 24.0936 14.1305 24.2431 14.1305C24.3925 14.1305 24.5393 14.0699 24.645 13.964C24.7507 13.8583 24.8115 13.7118 24.8115 13.5621C24.8115 13.4122 24.7507 13.2661 24.645 13.1597C24.5393 13.054 24.3925 12.9937 24.2431 12.9937Z" />
                                <path d="M24.2431 5.30981C23.9291 5.30981 23.6746 5.56428 23.6746 5.87826V11.1484C23.6746 11.4623 23.9291 11.7168 24.2431 11.7168C24.557 11.7168 24.8115 11.4623 24.8115 11.1484V5.87826C24.8115 5.56428 24.557 5.30981 24.2431 5.30981Z" />
                                <path d="M14.8069 18.6786C16.4358 18.6786 17.7612 17.3534 17.7612 15.7245C17.7612 15.4105 17.5065 15.156 17.1928 15.156C16.8788 15.156 16.6243 15.4105 16.6243 15.7245C16.6243 16.7263 15.809 17.5417 14.8069 17.5417C14.4929 17.5417 14.2384 17.7962 14.2384 18.1101C14.2384 18.4241 14.4929 18.6786 14.8069 18.6786Z" />
                                <path d="M17.1926 14.3303C17.3422 14.3303 17.4888 14.2694 17.5945 14.1637C17.7002 14.058 17.761 13.9112 17.761 13.7618C17.761 13.6124 17.7004 13.4656 17.5945 13.3599C17.4888 13.2542 17.3422 13.1934 17.1926 13.1934C17.0431 13.1934 16.8966 13.2542 16.7909 13.3599C16.6852 13.4656 16.6241 13.6124 16.6241 13.7618C16.6241 13.9112 16.685 14.058 16.7909 14.1637C16.8966 14.2694 17.0431 14.3303 17.1926 14.3303Z" />
                            </g>
                            <defs>
                                <clipPath id="clip0_468_5155">
                                    <rect width="29.1044" height="29.1045" fill="white" transform="translate(0.254677 0.57373)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                </button>
            </div>
        </main >
    );
}
