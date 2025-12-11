import { useEffect, useState } from "react";
import { caxios } from "../../../../config/config";

function useDashLeftTwo() {
    const [bars, setBars] = useState([]);

    useEffect(() => {
        const defaultBars = [
            { label: "태그와 관련없는 글", value: 0 },
            { label: "욕설 및 적절하지 않은 용어 사용", value: 0 },
            { label: "광고성 게시물", value: 0 },
            { label: "불법 복제 및 저작권 침해 글", value: 0 },
        ];

        caxios.get("/dash/commentReportList")
            .then(resp => {
                console.log(resp.data);

                const updatedBars = defaultBars.map(item => {
                    const found = resp.data.find(d => d.report_type === item.label);
                    return found ? { ...item, value: Number(found.count) } : item;
                });

                updatedBars.sort((a, b) => b.value - a.value);

                const coloredBars = updatedBars.map((bar, index) => {
                    if (index === 0) return { ...bar, color: "#EA8125" };
                    if (index === updatedBars.length - 1) return { ...bar, color: "#FFDA76" };
                    return { ...bar, color: "#FDC575" };
                });

                setBars(coloredBars);
            })
            .catch(err => console.log(err));
    }, []);

    return { bars };
}

export default useDashLeftTwo;
