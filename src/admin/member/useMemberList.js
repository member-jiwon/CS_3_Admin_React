import { useEffect, useState } from "react";
import { caxios } from "../../config/config";

function useMemberList(newRender) {

    const [data, setData] = useState([{}]);

    useEffect(() => {
        caxios.get("/user/userList")
            .then(resp => {
                const formattedData = resp.data.map(user => {
                    let formattedContact = user.contact;
                    if (formattedContact && formattedContact.length === 11) {
                        formattedContact = `${formattedContact.slice(0, 3)}-${formattedContact.slice(3, 7)}-${formattedContact.slice(7)}`;
                    }
                    return {
                        ...user,
                        contact: formattedContact
                    };
                });
                setData(formattedData);
            })
    }, [newRender])

    return {
        data
    }
}
export default useMemberList;