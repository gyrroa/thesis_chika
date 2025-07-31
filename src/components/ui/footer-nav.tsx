'use client';

import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from './button';

export default function FooterNav() {
    const pathname = usePathname();
    const router = useRouter();
    const handleRoute = async (href = '/') => {
        try {
            await router.prefetch(href)
        } catch (err) {
            console.warn('Prefetch failed, navigating anyway:', err)
        }
        router.push(href)
    }
    const tabs = [
        { href: '/home', ssrc: '/home/home-s.svg', src: '/home/home.svg', alt: 'Home', disabled: false },
        { href: '/leaderboard', ssrc: '/home/leaderboard.svg', src: '/home/leaderboard.svg', alt: 'Leaderboard', disabled: true },
        { href: '/analytics', ssrc: '/home/analytics.svg', src: '/home/analytics.svg', alt: 'Analytics', disabled: true },
        { href: '/profile', ssrc: '/home/profile-s.svg', src: '/home/profile.svg', alt: 'Profile', disabled: false },
    ];

    return (
        <footer className="
      fixed bottom-0 z-50 w-full sm:w-[411px] 
      flex justify-between
      px-[50px] pt-[10px] pb-[15px]
      bg-[#FFFDF2] shadow-[0px_0px_17.9px_0px_rgba(196,85,0,0.35)]
      sm:rounded-[20px] shrink-0
    ">
            {tabs.map(({ href, ssrc, src, alt, disabled }) => {
                const isActive = pathname === href;
                return (
                    <Button
                        key={href}
                        variant={isActive ? 'default' : 'custom'}
                        disabled={disabled}
                        className="flex w-[50px] h-[50px] rounded-[20px] p-[10px]"
                        onClick={() => !disabled && handleRoute(href)}
                    >
                        <Image
                            src={isActive ? ssrc : src}
                            alt={alt}
                            width={20}
                            height={20}
                            className="m-auto"
                            priority
                        />
                    </Button>
                );
            })}
        </footer>
    );
}
