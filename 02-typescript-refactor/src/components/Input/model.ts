import { DetailedHTMLProps, InputHTMLAttributes } from "react";

type HTMLInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export interface InputProps extends HTMLInputProps {
    name: string;
}

export interface InputContainerProps {
    isFocused: boolean;
    isFilled: boolean;
}