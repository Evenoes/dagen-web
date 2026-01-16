import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";


type JoinUsCardProps = {
    title: string;
    infoText: string;
    popupLink: string;
    applyLink?: string;
};

export default function JoinUsCard({ title, infoText, popupLink, applyLink }: JoinUsCardProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    return (
        null
    )
}