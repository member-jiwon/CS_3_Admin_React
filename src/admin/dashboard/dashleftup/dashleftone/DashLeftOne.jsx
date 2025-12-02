import styles from "./DashLeftOne.module.css";
import React from "react";
import { Bar } from "react-chartjs-2";
import "../../../../chartSetup";

const DashLeftOne = () => {

    const data = {
        labels: ["Red", "Blue", "Green", "314"],
        datasets: [
            {
                label: "판매량",
                data: [12, 19, 7, 10],
                backgroundColor: ["#f87171", "#60a5fa", "#34d399", "#34d399"],
            },
        ],
    };

    // 합계 계산
    const sum = data.datasets[0].data.reduce((a, b) => a + b, 0);
    const options = {
        indexAxis: "y", // 가로 막대
        responsive: true,
        plugins: {
            legend: { display: true },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const value = context.raw;
                        const percentage = ((value / sum) * 100).toFixed(1); // 소수점 1자리
                        return `${context.label}: ${percentage}%`;
                    },
                },
            },
        },
    };

    return (
        <div className={styles.onecontainer}>
            <Bar data={data} options={options} />
        </div>
    );
};

export default DashLeftOne;
