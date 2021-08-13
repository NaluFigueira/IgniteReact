interface Food {
    id: number;
    name: string;
    description: string;
    price: string;
    available: boolean;
    image: string;
}

export interface FoodProps {
    food: Food;
    handleEditFood: (food: Food) => void;
    handleDelete: (foodId: number) => void;
}

export type FoodContainerProps = Pick<Food, 'available'>;