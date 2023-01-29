import React, {useEffect, useState} from "react";
import classes from "./Modal.module.css";


export default function Modal({setModal}) {
    const setJwt = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("token")
        }
    };
    const [cart, setCart] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [qty, setQty] = useState();
    const [disabled, setDisabled] = useState(false);


    function handleClick(e) {
        const {type, id} = e.target.dataset


        const copy = [...cartItems];
        const index = copy.findIndex(cartItems => {
            return cartItems.product.id === +id;
        });

        if (index >= 0) {
            switch (type) {
                case 'decrement': {
                    if (copy[index].quantity > 1) {
                        --copy[index].quantity
                        setDisabled(false);
                        fetchUpdateCartItemQuantity(copy[index].product.id, copy[index].quantity)
                    } else {
                        deleteItem(copy[index].product.id);
                    }
                    break;
                }
                case 'increment': {
                    ++copy[index].quantity;
                    if (copy[index].product.totalStock === copy[index].quantity) {
                        setDisabled(true);
                    }
                    fetchUpdateCartItemQuantity(copy[index].product.id, copy[index].quantity)
                    break;
                }
            }
            setCartItems(copy)
        }
    }

    function getTotal() {
        let sum = 0;
        for (let i = 0; i < cartItems.length; i++) {
            sum += (cartItems[i].product.sellingPrice * cartItems[i].quantity)
        }
        return sum;
    }

    function getTotalWithTaxes() {
        let sum = getTotal();
        let total = (0.05 * sum) + sum + 20;
        return total
    }


    const fetchUpdateCartItemQuantity = async (id, quantity) => {
        let username = localStorage.getItem("username")
        console.log(quantity)
        fetch(`http://localhost:8080/cart/update-cart-item-quantity/${username}`, {
            method: 'POST',
            body: JSON.stringify({
                id: id, quantity: quantity
            }),
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

    const fetchCart = async () => {
        const name = localStorage.getItem("username")
        const request = await fetch(`http://localhost:8080/cart/get-cart/${name}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + localStorage.getItem("token"),
                }
            }
        )
        console.log(request)
        const response = await request.json();
        console.log(response)
        setCart(response);
        setCartItems(response.cartItems);
    }

    useEffect(() => {
        fetchCart();
    }, [])

    const deleteItem = async (id) => {
        let username = localStorage.getItem("username");
        const request = await fetch(`http://localhost:8080/cart/delete-cart-item/${id}/${username}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + localStorage.getItem("token"),

                }
            })
        const response = await request.json();
        setCart(response);
        setCartItems(response.cartItems);
    }

    const fetchDeleteItemFromCart = async (e) => {
        let username = localStorage.getItem("username");
        const request = await fetch(`http://localhost:8080/cart/delete-cart-item/${e.target.id}/${username}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + localStorage.getItem("token"),
                    'Access-Control-Allow-Origin': 'DELETE'

                }
            }
        )
        const response = await request.json();
        setCart(response);
        setCartItems(response.cartItems);
    }

    function closeModal() {
        setModal(false);
    }

    return (
        <>
            <div className={classes.container}>
                <div className={classes.modalContainer}>
                    <>
                        <div className={classes.close_container}>
                            <h1 className={classes.wrapper}>Shopping Cart</h1>
                            <span className={classes.close_btn}>
              <i
                  className="fas fa-close"
                  onClick={closeModal
                  }
              ></i>
              </span>
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
                                                <button
                                                    value={"-"}
                                                    data-type="decrement"
                                                    onClick={handleClick}
                                                    id={item.product.id}
                                                    data-id={item.product.id}>-</button>
                                                <input
                                                    onChange={(e) => setQty(item.quantity)}
                                                    value={item.quantity}/>
                                                <button
                                                    value={"+"}
                                                    data-type="increment"
                                                    disabled={disabled}
                                                    onClick={handleClick}
                                                    id={item.product.id}
                                                    data-id={item.product.id}>+
                                                </button>
                                            </p>
                                            <p className={classes.btnArea}>
                                                <i className="fa fa-trash"></i>
                                                <span className={classes.btn2} id={item.product.id}
                                                      onClick={fetchDeleteItemFromCart}>Remove</span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={classes.rightBar}>
                                <p><span>Subtotal</span> <span>${getTotal()}</span></p>
                                <hr>
                                </hr>
                                <p><span>Tax</span> <span>5%</span></p>
                                <hr>
                                </hr>
                                <p><span>Shipping</span> <span>$20</span></p>
                                <hr>
                                </hr>
                                <p><span>Total</span> <span>${getTotalWithTaxes()}</span></p>
                                <a href="/order"><i className="fa fa-shopping-cart"></i>Checkout</a>
                            </div>
                        </div>
                    </>
                </div>
            </div>

        </>
    );
}
