
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import ArrowDownIcon from "./icons/ArrowDownIcon";

type JobCardProps = {
    tittel: string;
    stillingstype: string;
    firma: string;
    frist: string;
    url: string;
    logo?: string;
    beskrivelse: string;
    scale?: number;
    fluid?: boolean;
};

function formatDate(date: string) {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${day}.${month}.${year}`;
}

export default function JobCard({
    tittel,
    stillingstype,
    firma,
    frist,
    url,
    logo,
    beskrivelse,
    scale = 1,
    fluid = false,
}: JobCardProps) {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);
    const [isClamped, setIsClamped] = useState(false);
    const inline = !isOpen && isClamped;

    useEffect(() => {
        if (!textRef.current) return;
        const el = textRef.current;

        if (!isOpen) {
            setIsClamped(el.scrollHeight > el.clientHeight + 1);
        }
    }, [beskrivelse, isOpen]);

    const aria = `${stillingstype}, ${tittel} hos ${firma}, søknadsfrist ${formatDate(frist)}. ${beskrivelse}`;

    return (
        <div
            className="origin-top-left"
            style={{ transform: `scale(${scale})` }}
        >
            <article
                className={[
                    "bg-(--card-bg)",
                    "border border-black",
                    "overflow-hidden",
                    fluid ? "w-full" : "w-[994.91px]",
                ].join(" ")}
            >
                {/* TOPPDEL */}
                <div className="px-16 pt-10 pb-8">
                    <div className="grid grid-cols-[1fr_auto] gap-6 items-start">
                        {/* Venstre: type + info */}
                        <div>
                            {/* Type-button */}
                            <Link
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={aria}
                                className={[
                                    "inline-flex items-center gap-3.5",
                                    "h-[77px] px-7",
                                    "rounded-[90.19px]",
                                    "border border-black bg-(--primary)",
                                    "font-mono font-normal",
                                    "text-[44.6px] leading-[1.2]",
                                    "tracking-[0]",
                                    "whitespace-nowrap",
                                    "hover:opacity-90 transition",
                                ].join(" ")}
                            >
                                <span>{stillingstype}</span>

                                <ArrowDownIcon className="w-12 h-12 -rotate-90 text-black" />
                            </Link>

                            {/* Info */}
                            <div className="mt-[18px] space-y-2.5 font-mono text-black">
                                <p className="text-[23.14px] leading-[43.7px] m-0">
                                    {"Stilling: " + tittel}
                                </p>
                                <p className="text-[23.14px] leading-[43.7px] m-0">
                                    {"Bedrift: " + firma}
                                </p>
                                <p className="text-[23.14px] leading-[43.7px] m-0">
                                    {"Frist: " + formatDate(frist)}
                                </p>
                            </div>
                        </div>

                        {/* Høyre: logo-boks */}
                        <div className="w-[267.08px] h-[267.08px]  bg-transparent p-4 flex items-center justify-center">
                            {logo ? (
                                <Image
                                    src={`${router.basePath}/logos/${logo}`}
                                    alt=""
                                    width={257}
                                    height={257}
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <div className="w-full h-full" aria-hidden />
                            )}
                        </div>
                    </div>
                </div>

                {/* DELELINJE */}
                <div className="border-t border-black" />

                {/* BUNNDEL */}

                <div className="px-6 pt-6 pb-[22px]">
                    <div className="flex flex-col items-end">
                        <div className="relative w-full">
                            <p
                                ref={textRef}
                                className={[
                                    "font-mono text-black",
                                    "text-[23.14px] leading-[43.7px]",
                                    "m-0",
                                    "text-justify",
                                    isOpen ? "" : "line-clamp-4",
                                    inline ? `pb-[43.7px]` : "",
                                ].join(" ")}
                            >
                                {beskrivelse}
                            </p>

                            {/* Mask clampet og lukket */}
                            {inline && (
                                <>
                                    {/* Dekker hele nederste linje */}
                                    <div className="absolute left-0 right-0 bottom-0 h-[52px] bg-(--card-bg) pointer-events-none z-0" />
                                        {/* Dekker over / bak knappen - solid */}
                                    <div className="absolute right-0 bottom-0 h-20 w-[230px] pointer-events-none z-0">
                                        <div className="absolute inset-0 bg-(--card-bg)" />
                                        {/* Gradient fra bak knappen mot venstre */}
                                        <div className="absolute right-[220px] top-0 h-full w-[500px] bg-linear-to-l from-(--card-bg) to-transparent" />
                                    </div>

                                </>
                            )}

                            {/* Plassering: inline (absolute) ellers høyrejustert under */}
                            <div className={inline ? "" : "mt-3 flex justify-end"}>
                                {(isOpen || isClamped) && (
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setIsOpen((v) => !v);
                                        }}
                                        className={[
                                            // din originale knapp, uendret
                                            "h-[63.99px] px-[26px] w-[220px]",
                                            "rounded-[57.93px]",
                                            "border border-black bg-(--primary)",
                                            "font-mono font-normal text-[23.14px] leading-[43.7px]",
                                            "inline-flex items-center gap-3",
                                            "hover:opacity-90 transition",
                                            "whitespace-nowrap",

                                            // bare posisjonering når den skal stå "i linja"
                                            inline ? "absolute right-0 bottom-0 z-20" : "",
                                        ].join(" ")}
                                        aria-label={isOpen ? "Vis mindre" : "Vis mer"}
                                    >
                                        <span>{isOpen ? "Vis mindre" : "Vis mer"}</span>
                                        <ArrowDownIcon
                                            className={[
                                                "w-[22px] h-[22px] text-black transition-transform",
                                                isOpen ? "rotate-180" : "",
                                            ].join(" ")}
                                        />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </article>
        </div>
    );
}
