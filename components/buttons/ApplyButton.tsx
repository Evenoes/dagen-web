import Link from "next/link";
import Image from "next/image";
import rightArrow from "@/components/icons/rightArrow.svg";
import { buttonClasses } from "@/components/buttons/buttonStyles";

// Søk-knapp (åpner i ny fane)
export default function ApplyButton({ href }: { href: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClasses("w-28")}
    >
      <span className="leading-none">Søk</span>
      <Image src={rightArrow} alt="" width={10} height={10} priority />
    </Link>
  );
}
