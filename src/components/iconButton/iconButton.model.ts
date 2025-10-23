import { CSSProperties } from "react";

export interface iconButtonProps {
    isFavorite : boolean;
    style : CSSProperties;
    onClick : ()=>void
}