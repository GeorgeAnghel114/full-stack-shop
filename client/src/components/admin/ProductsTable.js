import {useState, Fragment} from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import classes from './Table.module.css';
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import Box from "@mui/material/Box";

export default function ProductsTable({products, setProducts}) {
    const baseURL = "http://localhost:8080";
    const headers = {'Authorization': "Bearer " + localStorage.getItem("token")};
    const [editProductId, setEditProductId] = useState(null);

    const [category, setCategory] = useState([]);
    const [brand, setBrand] = useState([]);
    const [supplier, setSupplier] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState(0);
    const [selectedBrand, setSelectedBrand] = useState(0);
    const [selectedSupplier, setSelectedSupplier] = useState(0);

    const menuClickedCategory = (event) => {
        event.preventDefault();
        setSelectedCategory(event.target.value);
    };

    const menuClickedBrand = (event) => {
        event.preventDefault();
        setSelectedBrand(event.target.value);
    };

    const menuClickedSupplier = (event) => {
        event.preventDefault();
        setSelectedSupplier(event.target.value);
    };
    const [editFormData, setEditFormData] = useState({
        categoryId: 0,
        brandId: 0,
        supplierId: 0,
        productName: "",
        referenceCode: "",
        descriptionColor: "",
        descriptionMaterial: "",
        descriptionInterior: "",
        descriptionSole: "",
        size: "",
        sellingPrice: 0,
        purchasePrice: 0,
        purchaseDate: null,
        totalStock: 0,
        discount: 0,
    });

    const handleEditFormChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newFormData = {...editFormData};
        newFormData[fieldName] = fieldValue;
        setEditFormData(newFormData);
    }

    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        const editedProduct = {
            categoryId: selectedCategory.valueOf(),
            brandId: selectedBrand.valueOf(),
            supplierId: selectedSupplier.valueOf(),
            productName: editFormData.productName,
            referenceCode: editFormData.referenceCode,
            descriptionColor: editFormData.descriptionColor,
            descriptionMaterial: editFormData.descriptionMaterial,
            descriptionInterior: editFormData.descriptionInterior,
            descriptionSole: editFormData.descriptionSole,
            size: editFormData.size,
            sellingPrice: editFormData.sellingPrice,
            purchasePrice: editFormData.purchasePrice,
            purchaseDate: editFormData.purchaseDate,
            totalStock: editFormData.totalStock,
            discount: editFormData.discount,
        };
        fetch(`${baseURL}/admin/edit-product/${editProductId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("token")},
            body: JSON.stringify(editedProduct)
        })
            .then(response => response.json())
            .then(() => {
                const newProducts = [...products];
                newProducts[editProductId] = editedProduct;
                setProducts(newProducts);
                setEditProductId(null);
            })
    };

    const handleEditClick = (event, product) => {
        event.preventDefault();
        setEditProductId(product.id);

        fetch(`${baseURL}/category/${product.id}`, {headers})
            .then(response => response.json())
            .then(data => setCategory(data))
            .then(() => {
                fetch(`${baseURL}/brand/${product.id}`, {headers})
                    .then(response => response.json())
                    .then(data => setBrand(data));
            })
            .then(() => {
                fetch(`${baseURL}/supplier/${product.id}`, {headers})
                    .then(response => response.json())
                    .then(data => setSupplier(data));
            })
            .then(() => {
                const formValues = {
                    categoryId: category.id,
                    brandId: brand.id,
                    supplierId: supplier.id,
                    productName: product.productName,
                    referenceCode: product.referenceCode,
                    descriptionColor: product.descriptionColor,
                    descriptionMaterial: product.descriptionMaterial,
                    descriptionInterior: product.descriptionInterior,
                    descriptionSole: product.descriptionSole,
                    size: product.size,
                    sellingPrice: product.sellingPrice,
                    purchasePrice: product.purchasePrice,
                    purchaseDate: product.purchaseDate,
                    totalStock: product.totalStock,
                    discount: product.discount,
                }
                setEditFormData(formValues);
            });
    };

    const handleCancelClick = () => {
        setEditProductId(null);
    };

    return (
    <div className={classes.Table}>
        <h3 style={{marginTop: '50px'}} align='center' >All Products</h3>
        <form onSubmit={handleEditFormSubmit} className={classes.Table}>
            <TableContainer
                component={Box}
                style={{boxShadow: "0px 13px 20px 0px #80808029"}}
                sx={{
                    width: '100%',
                    overflowX: 'auto',
                    position: 'relative',
                    display: 'block',
                }}
            >
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Show / Hide Product</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell align="left">Product Image</TableCell>
                            <TableCell align="left">Reference Code</TableCell>
                            <TableCell align="left">Color</TableCell>
                            <TableCell align="left">Material</TableCell>
                            <TableCell align="left">Interior</TableCell>
                            <TableCell align="left">Sole</TableCell>
                            <TableCell align="left">Size</TableCell>
                            <TableCell align="left">Selling Price</TableCell>
                            <TableCell align="left">Purchase Price</TableCell>
                            <TableCell align="left">Purchase Date</TableCell>
                            <TableCell align="left">Total Stock</TableCell>
                            <TableCell align="left">Discount</TableCell>
                            <TableCell align="left">Category</TableCell>
                            <TableCell align="left">Brand</TableCell>
                            <TableCell align="left">Supplier</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody style={{color: "white"}}>
                        {products.map((product) => (
                            <Fragment key={product.id}>
                                {editProductId === product.id ?
                                    (<EditableRow
                                        index={product.id}
                                        editProduct={product}
                                        handleEditFormChange={handleEditFormChange}
                                        handleCancelClick={handleCancelClick}
                                        selectedCategory={selectedCategory}
                                        selectedBrand={selectedBrand}
                                        selectedSupplier={selectedSupplier}
                                        menuClickedCategory={menuClickedCategory}
                                        menuClickedBrand={menuClickedBrand}
                                        menuClickedSupplier={menuClickedSupplier}
                                    />)
                                    :
                                    (<ReadOnlyRow
                                        index={product.id}
                                        product={product}
                                        handleEditClick={handleEditClick}
                                    />)}
                            </Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </form>
    </div>);
}