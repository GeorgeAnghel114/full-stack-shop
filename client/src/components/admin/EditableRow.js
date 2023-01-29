import classes from "./Table.module.css";
import Input from '@mui/material/Input';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {useEffect, useState} from "react";
import {MenuItem, TextField} from "@mui/material";

export default function EditableRow({editProduct,
                                        index,
                                        handleEditFormChange,
                                        handleCancelClick,
                                        selectedCategory,
                                        selectedBrand,
                                        selectedSupplier,
                                        menuClickedCategory,
                                        menuClickedBrand,
                                        menuClickedSupplier
                                    }) {
    const baseURL = "http://localhost:8080";
    const headers = {'Authorization': "Bearer " + localStorage.getItem("token")};
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        fetch(`${baseURL}/category`, {headers})
            .then(response => response.json())
            .then(data => setCategories(data));

        fetch(`${baseURL}/brand`, {headers})
            .then(response => response.json())
            .then(data => setBrands(data));

        fetch(`${baseURL}/supplier`, {headers})
            .then(response => response.json())
            .then(data => setSuppliers(data));
    }, []);


    return (
        <TableRow key={index}>
            <TableCell></TableCell>
            <TableCell>
                <Input
                    type="text"
                    name="productName"
                    required
                    placeholder="Enter a product name"
                    defaultValue={editProduct.productName}
                    onChange={handleEditFormChange}
                />
            </TableCell>
            <TableCell></TableCell>
            <TableCell>
                <Input
                    type="text"
                    name="referenceCode"
                    required
                    placeholder="Enter a reference code"
                    defaultValue={editProduct.referenceCode}
                    onChange={handleEditFormChange}
                />
            </TableCell>
            <TableCell>
                <Input
                    type="text"
                    name="descriptionColor"
                    required
                    placeholder="Enter a product color"
                    defaultValue={editProduct.descriptionColor}
                    onChange={handleEditFormChange}
                />
            </TableCell>
            <TableCell>
                <Input
                    type="text"
                    name="descriptionMaterial"
                    required
                    placeholder="Enter a product material"
                    defaultValue={editProduct.descriptionMaterial}
                    onChange={handleEditFormChange}
                />
            </TableCell>
            <TableCell>
                <Input
                    type="text"
                    name="descriptionInterior"
                    required
                    placeholder="Enter a product interior"
                    defaultValue={editProduct.descriptionInterior}
                    onChange={handleEditFormChange}
                />
            </TableCell>
            <TableCell>
                <Input
                    type="text"
                    name="descriptionSole"
                    required
                    placeholder="Enter a product description sole"
                    defaultValue={editProduct.descriptionSole}
                    onChange={handleEditFormChange}
                />
            </TableCell>
            <TableCell>
                <Input
                    type="text"
                    name="size"
                    required
                    placeholder="Enter a product size"
                    defaultValue={editProduct.size}
                    onChange={handleEditFormChange}
                />
            </TableCell>
            <TableCell>
                <Input
                    type="text"
                    name="sellingPrice"
                    required
                    placeholder="Enter a selling price"
                    defaultValue={editProduct.sellingPrice}
                    onChange={handleEditFormChange}
                />
            </TableCell>
            <TableCell>
                <Input
                    type="text"
                    name="purchasePrice"
                    required
                    placeholder="Enter a purchase price"
                    defaultValue={editProduct.purchasePrice}
                    onChange={handleEditFormChange}
                />
            </TableCell>
            <TableCell>
                <Input
                    type="date"
                    name="purchaseDate"
                    required
                    placeholder="Enter a purchase date"
                    onChange={handleEditFormChange}
                />
            </TableCell>
            <TableCell>
                <Input
                    type="text"
                    name="totalStock"
                    required
                    placeholder="Enter a product total stock"
                    defaultValue={editProduct.totalStock}
                    onChange={handleEditFormChange}
                />
            </TableCell>
            <TableCell>
                <Input
                    type="text"
                    name="discount"
                    required
                    placeholder="Enter a product discount"
                    defaultValue={editProduct.discount}
                    onChange={handleEditFormChange}
                />
            </TableCell>
            <TableCell>
                <TextField
                    id="standard-select-category"
                    select
                    required
                    label="Category"
                    defaultValue=""
                    value={selectedCategory}
                    helperText="Please select a category"
                    variant="standard"
                    onChange={menuClickedCategory}
                >
                    {categories.map((category, index) => (
                        <MenuItem key={index} value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </TextField>
            </TableCell>
            <TableCell>
                <TextField
                    id="standard-select-brand"
                    select
                    required
                    label="Brand"
                    defaultValue=""
                    value={selectedBrand}
                    name="brand"
                    helperText="Please select a brand"
                    variant="standard"
                    onChange={menuClickedBrand}
                >
                    {brands.map((brand, index) => (
                        <MenuItem key={index} value={brand.id}>
                            {brand.name}
                        </MenuItem>
                    ))}
                </TextField>
            </TableCell>
            <TableCell>
                <TextField
                    id="standard-select-supplier"
                    select
                    required
                    label="Supplier"
                    defaultValue=""
                    value={selectedSupplier}
                    helperText="Please select a supplier"
                    variant="standard"
                    onChange={menuClickedSupplier}
                >
                    {suppliers.map((supplier, index) => (
                        <MenuItem key={index} value={supplier.id}>
                            {supplier.name}
                        </MenuItem>
                    ))}
                </TextField>
            </TableCell>
            <TableCell>
                <button type='submit' className={classes.saveBtn}>Save</button>
            </TableCell>
            <TableCell>
                <button type='button' className={classes.cancelBtn} onClick={handleCancelClick}>Cancel</button>
            </TableCell>
        </TableRow>
    );
}