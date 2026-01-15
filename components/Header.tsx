// Header som vises på alle sider

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import HeaderButton from "./HeaderButton";

const links = [
    { href: "/program", label: "Program" },
    { href: "/bli-med", label: "Bli med i Dagen!" },
    { href: "/stillingsannonser", label: "Stillingsannonser" },
    { href: "/bedrift", label: "For bedrifter" },
    { href: "/om-oss", label: "Om oss" },
    { href: "/kontakt", label: "Kontakt oss" },
];

export default function Header() {
    const [isMobilMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();

    return (
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/30 pt-[35px]">
            <div className="max-w-[1304px] mx-auto px-4 md:px-6">
                <div className="relative h-[61px]">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="absolute inset-y-0 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 flex items-center"
                    >
                        <Image
                            src={`${router.basePath}/web-design/dagen-logo/at-black.svg`}
                            alt="dagen@ifi logo"
                            width={64.27}
                            height={58.93}
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex gap-4 absolute right-0 inset-y-0 items-center">
                        {links.map((link) => (
                            <HeaderButton
                                key={link.href}
                                href={link.href}
                                label={link.label}
                            />
                        ))}
                    </nav>

                    {/* Mobil Hamburger-menyknapp */}
                    <button
                        type="button"
                        className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-1 z-10"
                        onClick={() => setMobileMenuOpen(!isMobilMenuOpen)}
                        aria-label={isMobilMenuOpen ? "Lukk meny" : "Åpne meny"}
                        aria-expanded={isMobilMenuOpen}
                        aria-controls="mobile-menu"
                    >
                        <span className="block w-6 h-0.5 bg-current"></span>
                        <span className="block w-6 h-0.5 bg-current"></span>
                        <span className="block w-6 h-0.5 bg-current"></span>
                    </button>

                </div>
            </div>

            {/* Mobil Meny */}
            {isMobilMenuOpen && (
                <nav
                    id="mobile-menu"
                    className="md:hidden flex flex-col gap-3 p-4 border-t border-gray-200 font-mono bg-white"
                >
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`transition-colors ${router.pathname === link.href
                                ? "underline font-semibold"
                                : "hover:text-(--primary)"
                                }`}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.label}
                        </Link>

                    ))}
                </nav>
            )}
        </header>
    );
}
