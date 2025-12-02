import styles from "./DashRight.module.css";
import React from "react";
import { Pie } from "react-chartjs-2";
import "../../../chartSetup";

const DashboardIndex = () => {

    const data = {
        labels: ["Red", "Blue", "Green"],
        datasets: [
            {
                data: [12, 19, 7],
                backgroundColor: ["#f87171", "#60a5fa", "#34d399"],
            },
        ],
    };

    return (
        <div className={styles.rightcontainer}>
            <Pie data={data} />
        </div>
    );
};

export default DashboardIndex;
