import { ReactNode } from "react";

export interface ModalProps {
    isOpen: boolean;
    children: ReactNode;
    setIsOpen: (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void;
}