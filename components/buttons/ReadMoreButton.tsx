import Image from "next/image";
import downArrow from "@/components/icons/downArrow.svg";
import { buttonClasses } from "@/components/buttons/buttonStyles";

type ReadMoreButtonProps = {
  onClick: () => void;
  "aria-label"?: string;
};

// Les mer-knapp med pil ned
export default function ReadMoreButton({
  onClick,
  "aria-label": ariaLabel,
}: ReadMoreButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={buttonClasses("w-40")}
    >
      <span className="leading-none">Les mer</span>
      <Image src={downArrow} alt="" width={16} height={8} priority />
    </button>
  );
}
