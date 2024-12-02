import { AccountSideBar } from "@components/account/AccountSideBar/AccountSideBar.jsx";
import { styles } from "@pages/AccountPage/styles.js";
import { AccountOrders } from "@components/account/AccountOrders/AccountOrders.jsx";
import { AccountProducts } from "@components/account/AccountProducts/AccountProducts.jsx";
import { Page } from "@components/styledComponents.js";
import { AccountDetails } from "@components/account/AccountDetails/AccountDetails.jsx";

export const AccountPage = ({option = ""}) => {
    return (
        <Page>
            <div style={styles.container}>
                <AccountSideBar option={option} />
                {option === "" && (<AccountDetails />)}
                {option === "myorders" && (<AccountOrders />)}
                {option === "myitems" && (<AccountProducts />)}
            </div>
        </Page>
    )
}