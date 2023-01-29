import classes from './MainDash.module.css';
import ReportsCards from "./ReportsCards";
import OrdersTable from "./OrdersTable";
import ProductsTable from "./ProductsTable";
import AddProductTable from "./AddProductTable";

export default function MainDash(props) {
    return (
        <div className={classes.MainDash}>
            <h1>Dashboard</h1>
            <ReportsCards sales={props.sales}
                          totalSales={props.totalSales}
                          revenue={props.revenue}
                          totalRevenue={props.totalRevenue}
                          expenses={props.expenses}
                          totalExpenses={props.totalExpenses}
            />
            <OrdersTable/>
            <AddProductTable products={props.products}
                             setProducts={props.setProducts}
            />
            <ProductsTable products={props.products}
                           setProducts={props.setProducts}
            />
        </div>
    );
}