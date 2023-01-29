import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import classes from "./ProductPage.module.css";


const setJwt = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem("token")
    }
};
function ProductPage(props) {
    const [data, setData] = useState([]);
    let {id} = useParams();
    const [selects,setSelects] = useState();


    const addToCart = async(e)=>{
        e.preventDefault();
        const name = localStorage.getItem("username")

        const requestOptions={
            method:'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': "Bearer " + localStorage.getItem("token")
        
              },
            mode:'no-cors',
            body: JSON.stringify({
                "selects":selects
                })}
                

            const request = await fetch(`http://localhost:8080/cart/add-to-cart/${id}/${name}`,{
                method:'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Authorization': "Bearer " + localStorage.getItem("token")
            
                  },
                // mode:'no-cors',
                body: JSON.stringify({
                    "selects":selects
                    })})
            console.log(request)
            const response = await request.json();
            console.log(response)

    }
    useEffect(() => {
        const fetchProductById = async () => {

            const request = await fetch(
                "http://localhost:8080/prod/product/"+id,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + localStorage.getItem("token")
                    }
                }
            )
            const response = await request.json();
            setData(response);
        };
        fetchProductById();
    }, [props.id])


    return (
        <div className={classes.productContainer}>
            <div className={classes.productDiv}>
                <img className={classes.productImage} src={data.image}></img>
                <div className={classes.productInfo}>
                    <div className={classes.productBrandAndName}>
                        <h1>{data.brand}</h1>
                    </div>
                    <div className={classes.productName}>
                        <p>{data.productName}</p>
                    </div>
                    <div className={classes.productPrice}>
                        <p>{data.sellingPrice}$</p>
                    </div>
                    <div className={classes.productSizeInput}>
                        <form>
                            <label htmlFor="size"></label>
                            <select value={selects}  className={classes.inputstyle} onChange={e=>setSelects(e.target.value)}>
                                    <option value="">Choose your size</option>
                                    <option  value={data.size}>{data.size}</option>
                            </select>
                            <input onClick={addToCart}
                                className={classes.inputstyle}
                                type="submit"
                                value="Add to cart"
                                />
                        </form>
                    </div>
                    <div className={classes.productDescription}>
                        <p>
                            <b>Color:</b> {data.descriptionColor}
                        </p>
                        <p>
                            <b>Material:</b> {data.descriptionMaterial}
                        </p>
                        <p>
                            <b>Interior:</b> {data.descriptionInterior}
                        </p>
                        <p>
                            <b>Sole:</b> {data.descriptionSole}
                        </p>
                        <p>
                            <b>Reference Code:</b> {data.referenceCode}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;