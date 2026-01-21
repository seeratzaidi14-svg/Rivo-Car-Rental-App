export interface ICarBrandProps {
    text: string;
    image?: any;
    onPress? : () => void;
    isSelected? : number;
    isHorizontal?: boolean;
    item?: number;
}