import { AccountSideBar } from "@components/account/AccountSideBar/AccountSideBar.jsx";
import { styles } from "@pages/AccountPage/styles.js";
import { AccountOrders } from "@components/account/AccountOrders/AccountOrders.jsx";
import { AccountProducts } from "@components/account/AccountProducts/AccountProducts.jsx";
import { AccountContent, Page } from "@components/styledComponents.js";
import { useUser } from "@context/UserContext.jsx";
import { useEffect, useState } from "react";

export const AccountPage = ({option = ""}) => {
    const { token, handleGetUserDetails } = useUser();
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const getUserDetails = async () => {
            return await handleGetUserDetails();
        }

        getUserDetails().then((value) => {
            setUserDetails(value);
        })
    }, [token])

    if (!userDetails) {
        return (
            <Page>
                <h3>Cannot fetch user details. Please try to login again</h3>
            </Page>
        )
    }

    return (
        <Page>
            <div style={styles.container}>
                <AccountSideBar option={option} userDetails={userDetails} />
                {option === "" && (<AccountContent />)}
                {option === "myorders" && (<AccountOrders />)}
                {option === "myitems" && (<AccountProducts />)}
            </div>
        </Page>
    )
}