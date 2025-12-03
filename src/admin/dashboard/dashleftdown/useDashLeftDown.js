import { useEffect, useState } from "react";
import { caxios } from "../../../config/config";

function useDashLeftDown() {

    const [bars, setBars] = useState([]);

    useEffect(() => {
        const defaultBars = [
            { label: "~10 대", value: 0, color: "#ADB9E3" },
            { label: "20 대", value: 0, color: "#ADB9E3" },
            { label: "30 대", value: 0, color: "#ADB9E3" },
            { label: "40 대", value: 0, color: "#ADB9E3" },
            { label: "50 대", value: 0, color: "#ADB9E3" },
            { label: "60 대", value: 0, color: "#ADB9E3" },
            { label: "70 대~", value: 0, color: "#ADB9E3" },
        ];

        caxios.get("/dash/ageGroup")
            .then(resp => {
                console.log("엥?", resp.data);

                const updatedBars = defaultBars.map(item => {
                    const found = resp.data.find(d => d.report_type === item.label);
                    return found
                        ? { ...item, value: Number(found.count) }
                        : item;
                });

                // b.value 기준 정렬 제거 → defaultBars 순서 유지
                setBars(updatedBars);
            })
            .catch(err => console.log(err));
    }, []);

    return {
        bars
    }
}

export default useDashLeftDown;
