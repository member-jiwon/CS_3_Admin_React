import styles from "./DashLeftDown.module.css";
import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import "../../../chartSetup";


const DashLeftDown = () => {

    const data = {
        labels: ["Red", "Blue", "Green","3","Red", "Blue", "Green"],
        datasets: [
            {
                label: "판매량",
                data: [12, 19, 7],
                backgroundColor: ["#f87171", "#60a5fa", "#34d399", "#ffff","#f87171", "#60a5fa", "#34d399"],
            },
        ],
    };

    return (
        <div className={styles.rightcontainer}>
            {/* <h1>막대그래프예시</h1> */}
            <Bar data={data} />
        </div>
    );
};

export default DashLeftDown;
