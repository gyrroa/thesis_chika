import Image from "next/image";

export const Header = () => {
    return (
        //temporary md:
        <header className="flex h-[60px] md:h-[120px] absolute top-0 left-1/2 transform -translate-x-1/2 select-none">
            <Image
                src="/header/logo-with-text-h.svg"
                alt="Logo"
                width={330} // set max width for responsive needs
                height={100} // estimated, adjust if needed
                className="w-[216px] md:w-[330px] h-auto"
            />
        </header>
    );
};