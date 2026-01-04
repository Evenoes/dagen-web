// Viser ett bilde på nettsiden.

import Image from "next/image";
import { useRouter } from "next/router";

type ContentImageProps = {
    imagePath: string;
    rowNumber: number;
};

export default function ContentImage({ imagePath, rowNumber }: ContentImageProps) {
    // router brukes for å få basePath (viktig for GitHub Pages)
    // F.eks. hvis siden er på github.io/dagen-web/, så er basePath = "/dagen-web"
    const router = useRouter();

    return (
        <Image
            src={`${router.basePath}/${imagePath}`}  // Full path til bildet
            alt={`Bilde ${rowNumber + 1}`}           // Alt-tekst for skjermlesere
            width={1200}                             // Maks bredde
            height={800}                             // Maks høyde
            className="w-full h-auto rounded-lg"    // Styling: full bredde, auto høyde, avrundede hjørner
        />
    );
}
