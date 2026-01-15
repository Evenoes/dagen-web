
import Link from "next/link";

type HeaderButtonProps = {
    href: string;
    label?: string | null;
};

export default function HeaderButton({ href, label }: HeaderButtonProps) {
    const isAnchor = href.startsWith("#");
    const isExternal = href.startsWith("http://") || href.startsWith("https://");
    const hasFragment = href.includes("#"); // Er det sammensatt internlink og anker?
    const [rawBasePath, hash] = hasFragment ? href.split("#") : [href, null];
    const basePath = rawBasePath || "/";

    const normalizePath = (p: string) =>
        p === "/" ? "/" : p.replace(/\/+$/, "");

    // Hvis href peker til et anker (#), bruk smooth scroll i stedet for vanlig navigering
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (isAnchor) {
            // Gjør at "#row-2" ikke legges til i URL-en ("dagenatifi.no/bedrift#row-2" <- ser ikke bra ut)
            event.preventDefault();

            // Finn elementet på siden med denne id-en
            const targetElement = document.querySelector(href);

            // ?. betyr: hvis elementet finnes, scroll til det
            // Hvis ikke, gjør ingenting (unngår error)
            targetElement?.scrollIntoView({ behavior: "smooth" });
            return;
        }

        // Internlink med anker, fjerner hash
        if (hasFragment && typeof window !== "undefined") {
            const currentPath = normalizePath(window.location.pathname);
            const targetPath = normalizePath(basePath);

            if (currentPath === targetPath && hash) {
                event.preventDefault();
                const target = document.getElementById(hash);
                target?.scrollIntoView({ behavior: "smooth" });

                // Oppdaterer URL uten #row-n
                window.history.replaceState(null, "", targetPath);
            }
        }
    };

    const className =
        "inline-flex items-center justify-center " +
        "h-[59px] px-[16px] py-[8px] " +
        "rounded-[53.4px] border-[0.53px] border-black " +
        "bg-[var(--primary)] " +
        "font-mono font-normal text-[18px] leading-[34px] " +
        "hover:opacity-90 transition";


    if (isExternal) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
            >
                {label ?? "Les mer"}
            </a>
        );
    }

    return (
        <Link href={basePath} onClick={handleClick} className={className}>
            {label ?? "Les mer"}
        </Link>
    );
}
