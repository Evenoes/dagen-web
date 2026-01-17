import React from "react";
import OverlayShell from "@/components/OverlayShell";

type OverlayProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function JoinUsOverlay({ open, onClose, children }: OverlayProps) {
  return (
    <OverlayShell
      open={open}
      onClose={onClose}
      maxWidthClass="max-w-[1304px]"
      historyKey="__joinUsOverlay"
    >
      {children}
    </OverlayShell>
  );
}
