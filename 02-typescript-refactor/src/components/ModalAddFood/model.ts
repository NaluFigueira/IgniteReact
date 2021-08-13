import { Food } from "../Food/model";

export interface ModalAddFoodProps {
    handleAddFood: (food: Food) => void;
    setIsOpen: () => void;
    isOpen: boolean;
}