import { FaShoppingCart } from "react-icons/fa";
import classes from './ProductCard.module.css';
import { useNavigate } from "react-router-dom";

export default function ProductCard(props) {
    const navigate = useNavigate();

    return (
        <>
            <div key={props.id} className={classes.productCard}>
                <div className={classes.productCard__content}>
                    <img
                        src={props.image}
                        alt={props.name}
                        className={classes.productImage}
                    />
                    <h2 className={classes.productName}>{props.name}</h2>

                    <div className={classes.displayStack__1}>
                        <div className={classes.productPrice}>
                            ${props.sellingPrice}
                        </div>

                        <FaShoppingCart
                            onClick={() => {
                                navigate("/product/" + props.id);
                            }}
                            className={classes.productCard__cart}
                            values={props.id}
                        />
                    </div>
                    <div className={classes.productSales}>
                        {props.size} size
                    </div>
                </div>
            </div>
        </>
    );
}
