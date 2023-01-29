import React, { useState } from "react";
import classes from './ReportCard.module.css';
import { motion, AnimateSharedLayout } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import Chart from "react-apexcharts";

// parent Card

export default function ReportCard(props) {
    const [expanded, setExpanded] = useState(false);
    return (
        <AnimateSharedLayout>
            {expanded ? (
                <ExpandedCard param={props} setExpanded={() => setExpanded(false)} />
            ) : (
                <CompactCard param={props} setExpanded={() => setExpanded(true)} />
            )}
        </AnimateSharedLayout>
    );
};

// Compact Card
function CompactCard({ param, setExpanded }) {
    const Png = param.png;
    return (
        <motion.div
            className={classes.CompactCard}
            style={{
                background: param.color.backGround,
                boxShadow: param.color.boxShadow,
            }}
            layoutId="expandableCard"
            onClick={setExpanded}
        >
            <div className={classes.radialBar}>
                <Png />
                <span>{param.title}</span>
            </div>
            <div className={classes.detail}>
                <span>Last Month</span>
                <span>{param.value} $</span>
            </div>
        </motion.div>
    );
}

// Expanded Card
function ExpandedCard({ param, setExpanded }) {
    const data = {
        options: {
            chart: {
                type: "area",
                height: "auto",
            },
            fill: {
                colors: ["#fff"],
                type: "gradient",
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "smooth",
                colors: ["white"],
            },
            grid: {
                show: true,
            },
            xaxis: {
                type: "category",
            },
        },
    };

    return (
        <motion.div
            className={classes.ExpandedCard}
            style={{
                background: param.color.backGround,
                boxShadow: param.color.boxShadow,
            }}
            layoutId="expandableCard"
        >
            <div style={{ alignSelf: "flex-end", cursor: "pointer", color: "white" }}>
                <UilTimes onClick={setExpanded} />
            </div>
            <span>{param.title}</span>
            <div className={classes.chartContainer}>
                <Chart options={data.options} series={param.series} type="area" />
            </div>
            <span>Last Month</span>
        </motion.div>
    );
}