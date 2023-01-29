import classes from "./Order.module.css";
import {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";

function Order() {
    const navigate = useNavigate();

    const [cart, setCart] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [qty, setQty] = useState();

    const [details, setDetails] = useState({
        email: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        country: "",
        city: "",
        address: "",
        postal_code: "",
        observations: "",
        payment: "",
        delivery: "",
    }, [])

    const handleFormChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setDetails((prev) => {
            return {...prev, [name]: value}
        })
    }
    const fetchCart = async () => {
        let username = localStorage.getItem("username");
        const request = await fetch(`http://localhost:8080/cart/get-cart/${username}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + localStorage.getItem("token"),
                }
            })
        const response = await request.json();
        setCart(response);
        setCartItems(response.cartItems);
    }

    useEffect(() => {
        if (cart.length == 0) {
            fetchCart();
        }
    }, [])


    const fetchOrder = async (e) => {
        let username = localStorage.getItem("username");
        fetch(`http://localhost:8080/order/add-order/${username}`, {
            method: 'POST',
            body: JSON.stringify(details),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': "Bearer " + localStorage.getItem("token")
            },
        })
            .then((response) => response.json())
            .catch((err) => {
                console.log(err.message);
            })
    }
    const navigateToHome = async (e) => {
        navigate("/");
    }

    return (
        <div className={classes.bodydiv}>
            <div className={classes.center}>
                <h1>COMPLETE THE ORDER</h1>

                <form className={classes.formstyle}>
                    <div className={classes.bulletPoints}>
                        <p>1. Checkout cart</p>
                    </div>
                    <div className={classes.project}>
                        <div className={classes.shop}>
                            {cartItems && cartItems.map(item => (
                                <div className={classes.box}>
                                    <img src={item.product.image} alt=""/>
                                    <div className={classes.content}>
                                        <h3>{item.product.productName}</h3>
                                        <h4>{item.product.sellingPrice * item.quantity} $</h4>
                                        <p className={classes.unit}>Quantity:
                                            <input
                                                onChange={(e) => setQty(item.quantity)}
                                                value={item.quantity}/>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={classes.bulletPoints}>
                        <p>2. Account details</p>
                    </div>

                    <input
                        className={classes.txtfield}
                        type="text"
                        name='email'
                        placeholder="E-mail"
                        onChange={handleFormChange}
                    />
                    <div className={classes.bulletPoints}>
                        <p>3. Delivery details</p>
                    </div>

                    <input
                        className={classes.txtfield}
                        type="text"
                        placeholder="First Name"
                        name='first_name'
                        onChange={handleFormChange}

                    />
                    <input
                        className={classes.txtfield}
                        type="text"
                        placeholder="Last Name"
                        name='last_name'
                        onChange={handleFormChange}
                    />
                    <input
                        className={classes.txtfield}
                        type="text"
                        placeholder="Phone"
                        name='phone_number'
                        onChange={handleFormChange}
                    />

                    <input
                        className={classes.txtfield}
                        type="text"
                        placeholder="Country"
                        name='country'
                        onChange={handleFormChange}
                    />
                    <input
                        className={classes.txtfield}
                        type="text"
                        placeholder="City"
                        name='city'
                        onChange={handleFormChange}
                    />
                    <input
                        className={classes.txtfield}
                        type="text"
                        placeholder="Address"
                        name='address'
                        onChange={handleFormChange}
                    />
                    <input
                        className={classes.txtfield}
                        type="text"
                        placeholder="Postal Code"
                        name='postal_code'
                        onChange={handleFormChange}
                    />
                    <div className={classes.bulletPoints}>
                        <p>4. Delivery method</p>
                    </div>
                    <div className={classes.radios}>
                        <div>
                            <input
                                className={classes.inputRadio}
                                type="radio"
                                id="FAN COURIER"
                                value="Fan Courier"
                                name='delivery'
                                checked={details.delivery === "Fan Courier"}
                                onClick={handleFormChange}
                            />
                            <label for="FAN COURIER">FAN COURIER</label>
                        </div>
                        <div>
                            <input
                                className={classes.inputRadio}
                                type="radio"
                                id="css"
                                value="DHL"
                                name='delivery'
                                checked={details.delivery === "DHL"}
                                onClick={handleFormChange}
                            />
                            <label for="DHL">DHL</label>
                        </div>
                    </div>

                    <div className={classes.bulletPoints}>
                        <p>5. Payment method</p>
                    </div>
                    <div className={classes.radios}>
                        <div>
                            <input
                                className={classes.inputRadio}
                                type="radio"
                                id="css"
                                value="Cash"
                                name='payment'
                                checked={details.payment === "Cash"}
                                onClick={handleFormChange}
                            />
                            <label for="Cash">Cash</label>
                        </div>
                        <div>
                            <input
                                className={classes.inputRadio}
                                type="radio"
                                id="css"
                                name="payment"
                                value="Card"
                                checked={details.payment === "Card"}
                                onClick={handleFormChange}
                            />
                            <label for="Card">Card</label>
                        </div>
                    </div>

                    <div className={classes.bulletPoints}>
                        <p>6. Products</p>
                    </div>
                    <div className={classes.radios}>
                        <p>Delivery:$20</p>
                        <p>Tax:5%</p>
                        <p>TOTAL:${cart.totalPrices}</p>
                    </div>
                    <textarea
                        name='observations'
                        onChange={handleFormChange}
                        placeholder="Observations about order?">

                    </textarea>

                    <input
                        onClick={(e) => {
                            fetchOrder(e);
                            navigateToHome(e)
                        }}
                        className={classes.inputstyle}
                        type="submit"
                        value="Order"
                    />
                </form>
            </div>
        </div>
    );
}

export default Order;
