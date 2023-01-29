import { useEffect, useState } from "react";
import ProductCardList from "../components/user/ProductCardList";
import Slider from "../components/slider/Slider";

function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [loadedProducts, setLoadedProducts] = useState([]);

    useEffect(() => {

        setIsLoading(true);
        fetch("http://localhost:8080/prod/products")
            .then((response) => {
                console.log(response)
                return response.json();
            })
            .then((data) => {
                setLoadedProducts(data);
                setIsLoading(false);
            });
    },[]);


    if (isLoading) {
        return (
            <section>
                <p>Loading...</p>
            </section>
        );
    }

    return (
        <section>
            <Slider />
            <ProductCardList products={loadedProducts} />
        </section>
    );
}

export default Home;
