
import { AppConst } from "@/app-const";
import axiosInstance from "@/config/axios";
import { selectAuth } from "@/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
const Redirect = () => {
    const login = useSelector(selectAuth).login
    const user = login?.user ? login.user : null
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
            toast.error("No params found in URL")
            navigate(AppConst.USER_PROFILE_URL)
            return
        }

        axiosInstance.get("user/v1/save-coin", { params })
            .then((response) => {
                // Handle successful response
                navigate(AppConst.USER_PROFILE_URL)
                console.log(response);
            })
            .catch((error) => {
                toast.error("Lỗi nạp tiền")
                // Handle error
                console.log(error);
            });
    }, []);

    return null;
};

export default Redirect;

