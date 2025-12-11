import { useEffect, useState } from "react";
import { caxios } from "../../config/config";
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

function useMemberList(newRender) {

    const logout = useAuthStore(state => state.logout);
    const navi = useNavigate();
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
            .catch(err => {
                logout();
                navi("/");
            })
    }, [newRender])

    return {
        data
    }
}
export default useMemberList;