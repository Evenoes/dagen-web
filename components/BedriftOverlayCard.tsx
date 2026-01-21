import Image from "next/image";
import checkedIcon from "@/components/icons/checked_icon.svg";
import uncheckedIcon from "@/components/icons/unchecked_icon.svg";

type CardLayout = "fixed" | "fluid";

type BedriftOverlayCardProps = {
    title: string;
    items: { checked: string; text: string }[];
    layout?: CardLayout;
};

export default function BedriftOverlayCard({
    title,
    items,
    layout = "fixed",
}: BedriftOverlayCardProps) {
    const isFixed = layout === "fixed";

    return (
        <div
            className={[
                "w-full md:w-[360px]",
                isFixed ? "md:h-[474px]" : "md:h-auto",
                "relative",
                "font-mono font-normal",
                "bg-overlay-card outline outline-card-outline",
            ].join(" ")}
        >
            {/* Tittel */}
            <div
                className={[
                    isFixed
                        ? "md:w-[322px] md:left-[18.75px] md:top-[16.5px] md:absolute"
                        : "md:pt-[16.5px]",
                    "pt-6 md:pt-0",
                    "text-center text-3xl tracking-wider leading-6",
                ].join(" ")}
            >
                {title}
            </div>

            {/* Liste */}
            <div
                className={[
                    isFixed
                        ? "md:w-[325.75px] md:h-[388.25px] md:top-[69.5px] md:absolute"
                        : "md:w-[325.75px] md:mt-8",
                    "mt-6 md:mt-0",
                    "px-4 pb-4",
                    "text-sm tracking-wide leading-6",
                ].join(" ")}
            >
                <ul className="m-0 list-none p-0 space-y-2">
                    {items.map((row, idx) => {
                        const checked = row.checked.trim() === "1";

                        return (
                            <li key={`${idx}-${row.text}`} className="flex items-start gap-6">
                                <Image
                                    src={checked ? checkedIcon : uncheckedIcon}
                                    alt={checked ? "Ja" : "Nei"}
                                    width={14}
                                    height={14}
                                    className="mt-1 shrink-0"
                                />
                                <span className="text-left wrap-break-word">{row.text}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
