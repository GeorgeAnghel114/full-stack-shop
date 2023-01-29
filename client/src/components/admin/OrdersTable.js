import * as React from "react";
import classes from './Table.module.css';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {useEffect, useState} from "react";
import moment from "moment/moment";
import {Link} from "@mui/material";
import OrdersModal from "./OrdersModal";
import Box from "@mui/material/Box";
import {NumericFormat} from 'react-number-format';

export default function OrdersTable() {
    const baseURL = "http://localhost:8080";
    const headers = {'Authorization': "Bearer " + localStorage.getItem("token")};
    const [orders, setOrders] = useState([]);
    const [clickedOrder, setClickedOrder] = useState([]);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        fetch(`${baseURL}/order`, {headers})
            .then(response => response.json())
            .then(data => setOrders(data));
    }, []);

    function openModal() {
        setModal(true);
        document.body.style.overflow = "visible";
    }

    function handleClickEvent(e, data) {
        setClickedOrder(data);
        openModal();
    }

    const headCells = [
        {
            id: 'Tracking ID',
            align: 'center',
            disablePadding: false,
            label: 'Tracking ID'
        },
        {
            id: 'Customer Name',
            align: 'center',
            disablePadding: false,
            label: 'Customer Name'
        },
        {
            id: 'Order Date',
            align: 'center',
            disablePadding: false,
            label: 'Order Date'
        },
        {
            id: 'Total amount',
            align: 'center',
            disablePadding: false,
            label: 'Total Amount'
        },
        {
            id: 'Details',
            align: 'center',
            disablePadding: false,
            label: ' '
        }
    ];

    return (
        <>
            <Box style={{boxShadow: "0px 13px 20px 0px #80808029"}}>
                <h3 align='center'>Recent Orders</h3>
                <TableContainer
                    sx={{
                        width: '100%',
                        overflowX: 'auto',
                        position: 'relative',
                        display: 'block',
                        maxWidth: '100%', '& td, & th': {whiteSpace: 'nowrap'}
                    }}
                >
                    <Table
                        aria-labelledby="tableTitle"
                    >
                        <TableHead>
                            <TableRow>
                                {headCells.map((headCell) => (
                                    <TableCell
                                        key={headCell.id}
                                        align={headCell.align}
                                        padding={headCell.disablePadding ? 'none' : 'normal'}
                                    >
                                        {headCell.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {orders.map((order) => (
                                <TableRow
                                    hover
                                    role="checkbox"
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    tabIndex={-1}
                                    key={order.id}
                                >
                                    <TableCell align="center">{order.trackingId}</TableCell>
                                    <TableCell align="center">{order.first_name} {order.last_name}</TableCell>
                                    <TableCell align="center">{moment(order.orderDate).format('DD-MM-YYYY')}</TableCell>
                                    <TableCell align="center">
                                        <NumericFormat value={order.totalPrice} displayType="text" thousandSeparator
                                                       prefix="$"/>
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        <button type='button' className={classes.detailsBtn}
                                                onClick={(event) => handleClickEvent(event, order)}>Details
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            {modal && <OrdersModal setModal={setModal} order={clickedOrder}/>}
        </>
    );
}