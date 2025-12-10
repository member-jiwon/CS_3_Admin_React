import styles from "./DashLeftTwo.module.css";
import React from "react";
import { Bar } from "react-chartjs-2";
import "../../../../chartSetup";
import useDashLeftTwo from "./useDashLeftTwo";

const DashLeftTwo = () => {

    const { bars } = useDashLeftTwo();
    const sum = bars.reduce((acc, b) => acc + b.value, 0);

    const data = {
        labels: bars.map(b => b.label),
        datasets: [
            {
                label: "",
                data: bars.map(b => b.value),
                backgroundColor: bars.map(b => b.color),
            },
        ],
    };

    const options = {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                ticks: {
                    display: false,
                },
                grid: {
                    drawOnChartArea: false,
                    drawTicks: false,
                    drawBorder: false,
                },
            },
            x: {
                ticks: { display: false },
                grid: {
                    drawOnChartArea: false,
                    drawTicks: false,
                    drawBorder: true,
                },
            },
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const b = bars[context.dataIndex];
                        const percentage = ((b.value / sum) * 100).toFixed(1);
                        return `${b.label}: ${percentage}%`;
                    },
                },
            },
            datalabels: {
                color: "#696B70",
                anchor: "start",
                align: "end",
                clip: false,
                padding: { left: 50 },
                formatter: (value, context) => {
                    const b = bars[context.dataIndex];
                    const percentage = ((b.value / sum) * 100).toFixed(1);
                    return `${b.label}\n${percentage}%`;
                },

            },
        },
    };
    return (
        <div className={styles.twocontainer}>
            <div className={styles.ddsh}>댓글 신고</div>
            <Bar data={data} options={options} style={{ margin: "20px 8px 40px 8px", width: "100%", height: "100%" }} />
        </div>
    );
};

export default DashLeftTwo;
