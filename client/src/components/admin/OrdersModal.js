import classes from './OrdersModal.module.css';
import React from "react";
import moment from "moment/moment";

export default function OrdersModal({setModal, order}) {

    function closeModal() {
        setModal(false);
    }

    return (
        <div className={classes.container}>
            <div>
                <div>
                        <span className={classes.close_btn}>
                            <i className="fas fa-close" onClick={closeModal}></i>
                        </span>
                </div>
                <div className={classes.box}>
                    <table>
                        <h3 style={{marginLeft: '50px', fontStyle: 'oblique'}}>CUSTOMER</h3>

                            <tr>
                                <th>Name:</th>
                                <td>{order.first_name} {order.last_name}</td>
                            </tr>
                            <tr>
                                <th>Email:</th>
                                <td>{order.email}</td>
                            </tr>
                            <tr>
                                <th>Phone number:</th>
                                <td>{order.phone_number}</td>
                            </tr>

                        <h3 style={{marginTop: '30px', marginLeft: '50px', fontStyle: 'oblique'}}>DELIVERY</h3>

                            <tr>
                                <th>Country:</th>
                                <td>{order.country}</td>
                            </tr>
                            <tr>
                                <th>City:</th>
                                <td>{order.city}</td>
                            </tr>
                            <tr>
                                <th>Address:</th>
                                <td>{order.address}</td>
                            </tr>
                            <tr>
                                <th>Postal Code:</th>
                                <td>{order.postal_code}</td>
                            </tr>
                            <tr>
                                <th>Notes:</th>
                                <td>{order.notes}</td>
                            </tr>

                        <h3 style={{marginTop: '30px', marginLeft: '60px', fontStyle: 'oblique'}}>ORDER</h3>

                            <tr>
                                <th>Order Date:</th>
                                <td>{moment(order.orderDate).format('DD-MM-YYYY')}</td>
                            </tr>
                            <tr>
                                <th>Total Amount:</th>
                                <td>{order.totalPrice}</td>
                            </tr>
                            <tr>
                                <th>Tracking ID:</th>
                                <td>{order.trackingId}</td>
                            </tr>
                    </table>
                </div>
            </div>
        </div>
    );
}