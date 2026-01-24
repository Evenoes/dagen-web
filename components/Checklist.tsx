import Image from "next/image";
import checkedIcon from "@/components/icons/checked_icon.svg";
import uncheckedIcon from "@/components/icons/unchecked_icon.svg";

type ChecklistItem = {
    checked: string;
    text: string;
};

type ChecklistProps = {
    items: ChecklistItem[];
};

export default function Checklist({ items }: ChecklistProps) {
    return (
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
    );
}