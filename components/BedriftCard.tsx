import ReactMarkdown from "react-markdown";
import ReadMoreButton from "@/components/buttons/ReadMoreButton";

type BedriftCardProps = {
    title: string;
    bodyMd: string;
    onOpen: () => void;
};

export default function BedriftCard({ title, bodyMd, onOpen }: BedriftCardProps) {
    return (
        <div
            className={[
                "w-full md:w-[659px] md:min-h-[787px] flex flex-col",
                "outline outline-card-outline bg-card-bg",
                "px-6 py-6 text-text-color mx-auto justify-items-center",
            ].join(" ")}
        >
            {/* Tittel */}
            <div
                className={[
                    "flex justify-center",
                    "w-full min-w-0",
                    "text-4xl font-bold font-mono leading-8 tracking-widest",
                    "md:mt-[34px]",
                    "text-center uppercase",
                    "hyphens-auto wrap-anywhere",
                ].join(" ")}
            >
                {title}
            </div>

            {/* Tekst */}
            <div
                className={[
                    "flex justify-center flex-1",
                    "mt-8 text-lg font-normal font-mono leading-8 tracking-wide",
                    "[&>p]:m-0 hyphens-auto",
                    "md:min-h-96 md:mt-[86px] px-4",
                ].join(" ")}
            >
                <div className="whitespace-pre-line">
                    <ReactMarkdown>{bodyMd}</ReactMarkdown>
                </div>
            </div>

            {/* Les mer */}
            <div className={[
                "mt-10 mb-8 flex flex-wrap gap-4",
                "md:gap-2 w-full justify-start px-6",
            ].join(" ")}
            >
                <ReadMoreButton onClick={onOpen} />
            </div>
        </div>
    );
}
