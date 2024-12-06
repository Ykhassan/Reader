import { Link } from "react-router-dom"
import './Button.css'
const Button = ({ Path, ButtonName }) => {
    return (
        <Link to={Path} className="btn">
            {ButtonName}
        </Link>
    )
};

export default Button;