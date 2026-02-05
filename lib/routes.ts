export const ROUTES = {
    home: "/",
    program: "/program",
    bliMed: "/bli-med",
    stillingsannonser: "/stillingsannonser",
    bedrift: "/bedrift",
    omOss: "/om-oss",
    kontakt: "/kontakt",
} as const;

export type BedriftOverlay = "stand" | "samarbeidspartner";

export function bedriftOverlayUrl(overlay: BedriftOverlay) {
    return `${ROUTES.bedrift}?overlay=${overlay}` as const;
}