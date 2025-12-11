import { useEffect, useState } from "react";
import { caxios } from "../../../config/config";

function useDashRight() {
    const [slices, setSlices] = useState([]);

    useEffect(() => {
        const defaultBars = [
            { label: "커뮤니티", value: 0, color: "#E88D8D" },
            { label: "성장차트", value: 0, color: "#EA8125" },
            { label: "건강기록", value: 0, color: "#FDC575" },
            { label: "산모일기/하루일기", value: 0, color: "#FFDA76" },
            { label: "마이페이지", value: 0, color: "#ADB9E3" },
            { label: "아기정보", value: 0, color: "#95A5E0" },
        ];

        caxios.get("/dash/pathList")
            .then(resp => {
                const updatedSlices = defaultBars.map(item => {
                    const found = resp.data.find(d => d.path_name === item.label);
                    return found ? { ...item, value: Number(found.count) } : item;
                });

                setSlices(updatedSlices);
            });
    }, []);

    return { slices };
}

export default useDashRight;
