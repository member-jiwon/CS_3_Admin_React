import { useState } from "react";
import { caxios } from "../../config/config";
import useAuthStore from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { connectAdminWebSocket } from "../../webSocket/connectWebSocket";
import { CopyX } from "lucide-react";

function useLogin() {
    // 로그인 준비
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    // 값 받을 준비
    const [data, setData] = useState({ id: "", pw: "" });
    // 로그인 실패 css 상태변수
    const [authAlert, setauthAlert] = useState(false);

    // 핸들러
    const handleChange = (e) => {
        setauthAlert(prev => false);
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    }

    // 로그인 버튼 클릭시
    const handleComplete = () => {
        if (!data.id || !data.pw) {
            alert("아이디와 비밀번호 모두 입력해주세요.");
            return;
        }

        // caxios.get("/admin/test")
        // .then(resp=>console.log(resp.data));

        caxios.post("/admin/login", { admin_id: data.id, password: data.pw })
            .then(resp => {
                login(resp.data, data.id);
                connectAdminWebSocket(resp.data);
                navigate("/");
            })
            .catch(err => {
                alert("아이디 또는 비밀번호가 일치하지않습니다.");
                setData(prev => ({ ...prev, pw: "" }));
                setauthAlert(prev => !prev);
                console.log(err);
            });
    }

    // 엔터 클릭시
    const handleLoginKeyUp = (e) => {
        if (e.key === 'Enter') {
            handleComplete();
        }
    }

    return {
        data, authAlert, handleChange, handleComplete, handleLoginKeyUp
    }
}
export default useLogin;