import { customButtonProps } from "./customButton.model"
import "./customButton.css"

const CustomButton = ({onClick, style}:customButtonProps) =>{
    return(
            <div className="btn-custom" style={style} onClick={onClick}>
                <p>Back</p>
            </div>
    )
}
export default CustomButton
