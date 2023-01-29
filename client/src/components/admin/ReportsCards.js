import classes from './ReportsCards.module.css';
import { UilClipboardAlt } from "@iconscout/react-unicons";
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";

import ReportCard from "./ReportCard";

export default function ReportsCards({sales, totalSales, expenses, totalExpenses, revenue, totalRevenue}) {
    const salesDates = Object.keys(sales);
    const expensesDates = Object.keys(expenses);
    const revenueDates = Object.keys(revenue);
    const salesValues = Object.values(sales);
    const expensesValues = Object.values(expenses);
    const revenueValues = Object.values(revenue);

    const salesSeries = [];
    const expensesSeries = [];
    const revenueSeries = [];


    for (let i = 0; i < salesDates.length; i++) {
            salesSeries.push({
                x: salesDates[i],
                y: salesValues[i]
            })
    }

    for (let i = 0; i < expensesDates.length; i++) {
        expensesSeries.push({
            x: expensesDates[i],
            y: expensesValues[i]
        })
    }

    for (let i = 0; i < revenueDates.length; i++) {
        revenueSeries.push({
            x: revenueDates[i],
            y: revenueValues[i]
        })
    }

    const cardsData = [
        {
            title: "Sales",
            color: {
                backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
                boxShadow: "0px 10px 20px 0px #e0c6f5",
            },
            value: totalSales,
            png: UilUsdSquare,
            series: [
                {
                    name: "Sales",
                    data: salesSeries,
                },
            ],
        },
        {
            title: "Revenue",
            color: {
                backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
                boxShadow: "0px 10px 20px 0px #FDC0C7",
            },
            value: totalRevenue,
            png: UilMoneyWithdrawal,
            series: [
                {
                    name: "Revenue",
                    data: revenueSeries,
                },
            ],
        },
        {
            title: "Expenses",
            color: {
                backGround:
                    "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
                boxShadow: "0px 10px 20px 0px #F9D59B",
            },
            value: totalExpenses,
            png: UilClipboardAlt,
            series: [
                {
                    name: "Expenses",
                    data: expensesSeries,
                },
            ],
        },
    ];

    return (
        <div className={classes.Cards}>
            {cardsData.map((card, id) => {
                return (
                    <div className={classes.parentContainer} key={id}>
                        <ReportCard
                            title={card.title}
                            color={card.color}
                            barValue={card.barValue}
                            value={card.value}
                            png={card.png}
                            series={card.series}
                        />
                    </div>
                );
            })}
        </div>
    );
}