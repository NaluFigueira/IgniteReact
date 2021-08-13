import { Food } from "../Food/model";

export interface ModalEditFoodProps {
    handleUpdateFood: (food: Food) => void;
    setIsOpen: () => void;
    isOpen: boolean;
    editingFood: Food;
}