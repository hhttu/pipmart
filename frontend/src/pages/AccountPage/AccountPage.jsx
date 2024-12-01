import { AccountSideBar } from "@components/account/AccountSideBar/AccountSideBar.jsx";
import { styles } from "@pages/AccountPage/styles.js";
import { useState } from "react";
import { AccountOrders } from "@components/account/AccountOrders/AccountOrders.jsx";
import { AccountProducts } from "@components/account/AccountProducts/AccountProducts.jsx";
import { Page } from "@components/styledComponents.js";

export const AccountPage = () => {
    const [option, setOption] = useState("orders");

    return (
        <Page>
            <div style={styles.container}>
                <AccountSideBar option={option} setOption={setOption}/>
                {option === "orders" && (<AccountOrders />)}
                {option === "products" && (<AccountProducts />)}
            </div>
        </Page>
    )
}