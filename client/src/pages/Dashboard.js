import MainDash from "../components/admin/MainDash";
import classes from './Dashboard.module.css';
import {useEffect, useState} from "react";

export default function Dashboard() {
    const baseURL = "http://localhost:8080/admin";
    const [sales, setSales] = useState([]);
    const [revenue, setRevenue] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [totalSales, setTotalSales] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [loadedProducts, setLoadedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData()
            .then(() => {
                setIsLoading(false);
            });
    }, [isLoading]);


    async function fetchData() {
        await getProductsFetch();
        await getSalesFetch();
        await getTotalSalesFetch();
        await getRevenueFetch();
        await getTotalRevenueFetch();
        await getExpensesFetch();
        await getTotalExpensesFetch();
    }

    const headers = {'Authorization': "Bearer " + localStorage.getItem("token")};

    async function getProductsFetch() {
        fetch(baseURL, {headers})
            .then(response => response.json())
            .then(data => setLoadedProducts(data));
    }

    async function getSalesFetch() {
        fetch(`${baseURL}/get-sales`, {headers})
            .then(response => response.json())
            .then(data => setSales(data));
    }

    async function getRevenueFetch() {
        fetch(`${baseURL}/get-revenue`, {headers})
            .then(response => response.json())
            .then(data => setRevenue(data));
    }

    async function getExpensesFetch() {
        fetch(`${baseURL}/get-expenses`, {headers})
            .then(response => response.json())
            .then(data => setExpenses(data));
    }

    async function getTotalSalesFetch() {
        fetch(`${baseURL}/get-total-sales`, {headers})
            .then(response => response.json())
            .then(data => setTotalSales(data));
    }

    async function getTotalRevenueFetch() {
        fetch(`${baseURL}/get-total-revenue`, {headers})
            .then(response => response.json())
            .then(data => setTotalRevenue(data));
    }

    async function getTotalExpensesFetch() {
        fetch(`${baseURL}/get-total-expenses`, {headers})
            .then(response => response.json())
            .then(data => setTotalExpenses(data));
    }

    return (
        <div className={classes.Dashboard}>
            <div className={classes.DashGlass}>
                {!isLoading && <>
                    <MainDash products={loadedProducts}
                              setProducts={setLoadedProducts}
                              sales={sales}
                              totalSales={totalSales}
                              revenue={revenue}
                              totalRevenue={totalRevenue}
                              expenses={expenses}
                              totalExpenses={totalExpenses}
                    />
                </>}
            </div>
        </div>
    );
}

