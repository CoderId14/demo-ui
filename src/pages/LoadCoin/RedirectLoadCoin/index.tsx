
import { AppConst } from "@/app-const";
import axiosInstance from "@/config/axios";
import { message } from "antd";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
const Redirect = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const params = {
            ...Object.fromEntries(urlParams.entries())
        };
        console.log("urlParams: ", urlParams)
        console.log("params: ", params)
        if (Object.keys(params).length === 0) {
            // Handle empty params object
            message.error("No params found in URL")
            navigate(AppConst.USER_PROFILE_URL)
            return
        }

        axiosInstance.get("user/v1/save-coin", { params })
            .then((response) => {
                message.success("Nạp tiền thành công")
                // Handle successful response
                navigate(AppConst.USER_PROFILE_URL)
                console.log(response);
            })
            .catch((error) => {
                message.error("Lỗi nạp tiền")
                navigate(AppConst.HOME_URL)
                // Handle error
                console.log(error);
            });
    }, []);

    return null;
};

export default Redirect;

