import styles from "./DashRight.module.css";
import React from "react";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";
import useDashRight from "./useDashRight";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const DashboardIndex = () => {
    // 객체 배열로 데이터 관리
    const { slices } = useDashRight();

    const sum = slices.reduce((acc, s) => acc + s.value, 0);

    const data = {
        labels: slices.map(s => s.label),
        datasets: [
            {
                data: slices.map(s => s.value),
                backgroundColor: slices.map(s => s.color),
            },
        ],
    };

    const options = {
        responsive: true,
        cutout: "45%",
        plugins: {
            legend: { position: "bottom" },
            datalabels: {
                color: "#696B70",
                formatter: (value, context) => {
                    const s = slices[context.dataIndex];
                    const percentage = ((s.value / sum) * 100).toFixed(1);
                    return `${percentage}%`;
                },
                font: { weight: "bold" },
            },
        },
    };

    return (
        <div className={styles.rightcontainer}>
            <div className={styles.herderText}>페이지 관리</div>
            <div className={styles.dashBox}>
                <Pie data={data} options={options}/>
            </div>
        </div>
    );
};

export default DashboardIndex;
