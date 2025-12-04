import styles from "./DashLeftTwo.module.css";
import React from "react";
import { Bar } from "react-chartjs-2";
import "../../../../chartSetup";
import useDashLeftTwo from "./useDashLeftTwo";

const DashLeftTwo = () => {
    // 각 막대 데이터: 라벨, 값, 색상
    const { bars } = useDashLeftTwo();

    const sum = bars.reduce((acc, b) => acc + b.value, 0);

    // Chart.js 데이터 구조
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
                    display: false, // y축 라벨 숨기기
                },
                grid: {
                    drawOnChartArea: false, // 막대 안쪽 격자선 제거
                    drawTicks: false,        // 눈금 표시 제거
                    drawBorder: false,       
                },
            },
            x: {
                ticks: { display: false }, // x축 숫자 숨김
                grid: {
                    drawOnChartArea: false, // 막대 안쪽 격자선 제거
                    drawTicks: false,        // 눈금 제거
                    drawBorder: true,        // x축 가장자리 선 유지
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
                    return `${b.label}\n${percentage}%`; // 막대 끝에 %와 라벨 표시
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
