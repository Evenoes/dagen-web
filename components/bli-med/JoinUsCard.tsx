import ReactMarkdown from "react-markdown";
import ApplyButton from "../buttons/ApplyButton";
import ReadMoreButton from "../buttons/ReadMoreButton";

type JoinUsCardProps = {
    title: string;
    infoText: string;
    onOpen: () => void;
    applyLink: string | null;
};

export default function JoinUsCard({ title, infoText, onOpen, applyLink }: JoinUsCardProps) {
    return (
        <div
            className={[
                "w-[360px] md:w-96 h-auto md:h-[602px]",
                "relative bg-(--card-bg) outline-1 -outline-offset-1 outline-black overflow-hidden",
                "px-6 py-6 md:px-0 md:py-0",
            ].join(" ")}
        >
            {/* Tittel */}
            <div
                className={[
                    "text-center text-black text-4xl font-normal font-mono leading-8 tracking-widest",
                    "md:absolute md:left-0 md:top-[34px] md:w-96",
                ].join(" ")}
            >
                {title}
            </div>

            {/* Tekst */}
            <div
                className={[
                    "mt-8 text-justify text-black text-lg font-normal font-mono leading-8 tracking-wide",
                    "[&>p]:m-0",
                    "md:absolute md:top-[86px] md:left-[39px] md:right-[39px] md:h-96 md:mt-0",
                ].join(" ")}
            >
                <div className="whitespace-pre-line leading-loose">
                    <ReactMarkdown>{infoText}</ReactMarkdown>
                </div>
            </div>

            {/* Knapper */}
            <div className="mt-10 flex items-center justify-between md:mt-0 md:static">
                {/* Les mer */}
                <div className="md:absolute md:left-[35px] md:top-[506px]">
                    <ReadMoreButton onClick={onOpen} />
                </div>

                {/* Søk */}
                {applyLink && (
                    <div className="md:absolute md:right-[35px] md:top-[506px]">
                        <ApplyButton href={applyLink} />
                    </div>
                )}
            </div>

        </div>
    );
}
