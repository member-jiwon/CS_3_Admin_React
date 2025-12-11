import { useEffect, useState } from "react";
import { caxios } from "../../config/config";

function useBoardList(newRender) {

    const [data, setData] = useState([]);

    useEffect(() => {
        caxios.get("/report/boardList")
            .then(resp => {
                const formattedData = resp.data.map(item => {
                    const date = new Date(item.created_at);
                    const yyyy = date.getFullYear();
                    const mm = String(date.getMonth() + 1).padStart(2, '0');
                    const dd = String(date.getDate()).padStart(2, '0');

                    return {
                        ...item,
                        created_at: `${yyyy}-${mm}-${dd}`
                    };
                });
                setData(formattedData);
            });
    }, [newRender])

    return {
        data
    }
}
export default useBoardList;