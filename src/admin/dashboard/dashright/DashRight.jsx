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
    cutout: "50%",    
    plugins: {
        legend: {
            position: "bottom",
            labels: {
                usePointStyle: true,   // 네모 → 원으로 변경
                pointStyle: 'rect',  // 확실히 circle 지정
                pointStyleWidth: 16,   // 원 크기
                color: "#696B70",
                font: { size: 16, weight: "bold", family: "Arial" },
                padding: 5,           // 항목 간 간격
            }
        },
        datalabels: {
            color: "#696B70",
            formatter: (value, context) => {
                const s = slices[context.dataIndex];
                const percentage = ((s.value / sum) * 100).toFixed(1);
                return `${percentage}%`;
            },
            font: { 
                weight: "bold",
                size: 12,
                family: "Arial",
                letterSpacing: -0.5,
            },
            anchor: "center",
            align: "center",
        },
        tooltip: {
            enabled: true,
            callbacks: {
                label: function(context) {
                    const s = slices[context.dataIndex];
                    return `${s.label}: ${s.value}`;
                }
            }
        }
    }
};

    return (
        <div className={styles.rightcontainer}>
    <div className={styles.herderText}>페이지 관리</div>
    <div className={styles.dashBox}>
        <div className={styles.chartWrapper}>
            <Pie data={data} options={options} />
        </div>
    </div>
</div>
    );
};

export default DashboardIndex;
