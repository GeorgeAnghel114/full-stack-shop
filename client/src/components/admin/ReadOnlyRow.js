import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import moment from 'moment';
import classes from './Table.module.css';
import {Checkbox} from "@mui/material";
import {pink} from "@mui/material/colors";
import {useState} from "react";

export default function ReadOnlyRow({product, index, handleEditClick}) {
    const baseURL = "http://localhost:8080";
    const headers = {'Authorization': "Bearer " + localStorage.getItem("token")};
    const [checked, setChecked] = useState(product.isAvailable);
    const [category, setCategory] = useState([]);
    const [brand, setBrand] = useState([]);
    const [supplier, setSupplier] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    if (isLoading === true) {
        fetch(`${baseURL}/category/${product.id}`, {headers})
            .then(response => response.json())
            .then(data => setCategory(data));

        fetch(`${baseURL}/brand/${product.id}`, {headers})
            .then(response => response.json())
            .then(data => setBrand(data));

        fetch(`${baseURL}/supplier/${product.id}`, {headers})
            .then(response => response.json())
            .then(data => setSupplier(data));

        setIsLoading(false);
    }

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
        product.isAvailable = !checked;

        fetch(`${baseURL}/admin/edit-product/${product.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("token")},
            body: JSON.stringify({...product})
        })
            .then(response => response.json());
    }

    return (
        <TableRow
            key={index}
            sx={{"&:last-child td, &:last-child th": {border: 0}}}
        >
            <TableCell>
                <Checkbox
                    checked={checked}
                    onChange={handleCheckboxChange}
                    sx={{
                        color: pink[800],
                        '&.Mui-checked': {
                            color: pink[600],
                        },
                    }}
                />
            </TableCell>
            <TableCell scope="row">{product.productName}</TableCell>
            <TableCell scope="row">
                <img
                    className={classes.image}
                    src={product.image}
                    alt="No image"
                />
            </TableCell>
            <TableCell align="left">{product.referenceCode}</TableCell>
            <TableCell align="left">{product.descriptionColor}</TableCell>
            <TableCell align="left">{product.descriptionMaterial}</TableCell>
            <TableCell align="left">{product.descriptionInterior}</TableCell>
            <TableCell align="left">{product.descriptionSole}</TableCell>
            <TableCell align="left">{product.size}</TableCell>
            <TableCell align="left">{product.sellingPrice}</TableCell>
            <TableCell align="left">{product.purchasePrice}</TableCell>
            <TableCell align="left">{moment(product.purchaseDate).format('DD-MM-YYYY')}</TableCell>
            <TableCell align="left">{product.totalStock}</TableCell>
            <TableCell align="left">{product.discount}</TableCell>
            <TableCell align="left">{category.name}</TableCell>
            <TableCell align="left">{brand.name}</TableCell>
            <TableCell align="left">{supplier.name}</TableCell>

            <TableCell align="center">
                <button type='button' className={classes.editBtn}
                        onClick={(event) => handleEditClick(event, product)}>Edit
                </button>
            </TableCell>
        </TableRow>
    )
}