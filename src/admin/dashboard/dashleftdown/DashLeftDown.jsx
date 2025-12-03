import styles from "./DashLeftDown.module.css";
import React from "react";
import { Bar } from "react-chartjs-2";
import "../../../chartSetup";
import useDashLeftDown from "./useDashLeftDown";

const DashLeftDown = () => {
    const { bars } = useDashLeftDown(); 
    const sum = bars.reduce((acc, b) => acc + b.value, 0);

    const data = {
        labels: bars.map(b => b.label),
        datasets: [
            {
                label: "판매량",
                data: bars.map(b => b.value),
                backgroundColor: bars.map(b => b.color),
            },
        ],
    };

    const options = {
        indexAxis: "x",
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 5
                },
                grid: {
                    drawTicks: true,        // 축 눈금은 보여주기
                    drawBorder: true,       // 축 외곽선 유지
                    drawOnChartArea: false, // 내부 격자선 제거
                },
            },
            x: {
                ticks: { 
                    autoSkip: false, 
                    maxRotation: 0, 
                    minRotation: 0 
                },
                grid: {
                    drawTicks: true,        // 축 눈금
                    drawBorder: true,       // 축 외곽선
                    drawOnChartArea: false, // 내부 격자선 제거
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
                formatter: (value, context) => {
                    const b = bars[context.dataIndex];
                    const percentage = ((b.value / sum) * 100).toFixed(1);
                    return `${percentage}%`;
                },
            },
        },
    };

    return (
        <div className={styles.rightcontainer} style={{ height: "400px" }}>
            <div>멤버 연령대 분포도</div>
            <Bar data={data} options={options} style={{ margin: "20px 15px 25px 3px" }} />
        </div>
    );
};

export default DashLeftDown;
