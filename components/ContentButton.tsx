// ContentButton viser en klikkbar knapp som kan:
// Linke til en annen side (f.eks. "/bedrift")
// Hoppe til et element på samme side (f.eks. "#row-2")

import Link from "next/link";

type ContentButtonProps = {
    href: string;           // Hvor skal knappen føre til? F.eks. "/bedrift" eller "#row-2"
    label?: string | null;  // Tekst på knappen (valgfri, default er "Les mer")
};

export default function ContentButton({ href, label }: ContentButtonProps) {
    const isAnchor = href.startsWith("#");
    const isExternal = href.startsWith("http://") || href.startsWith("https://");

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
        }
    };

    // Etern link? Ny fane
    if (isExternal) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4"
            >
                <button className="px-4 py-2 rounded-lg bg-(--primary) text-white text-sm font-medium hover:opacity-90 transition">
                    {label ?? "Les mer"}
                </button>
            </a>
        )
    }

    // Intern lenke, ikke ny fane
    return (
        <Link 
            href={href} 
            className="mt-4"
            onClick={handleClick}
        >
            <button className="px-4 py-2 rounded-lg bg-(--primary) text-white text-sm font-medium hover:opacity-90 transition">
                {/* Hvis ikke labeltekst vises: Les mer */}
                {label ?? "Les mer"}
            </button>
        </Link>
    );
}
