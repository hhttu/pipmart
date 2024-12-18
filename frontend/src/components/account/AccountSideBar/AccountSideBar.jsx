import { styles } from "@components/account/AccountSideBar/styles.js";
import { BackDrop, PopUpDialog, StyledButton, StyledButton2, StyledLinkSpan } from "@components/styledComponents.js";
import userLogo from "@assets/user-logo.jpg"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { GenericInput } from "@components/common/GenericInput/GenericInput.jsx";
import { GenericTextArea } from "@components/common/GenericTextArea/GenericTextArea.jsx";
import { useUser } from "@context/UserContext.jsx";

export const AccountSideBar = ({ option, userDetails }) => {
    const navigate = useNavigate();

    const {handleChangePassword} = useUser();

    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [openChangePassDialog, setOpenChangePassDialog] = useState(false);
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
    });

    const handleClick = (option) => {
        navigate(`/account/${option}`);
    }

    const handleChangePasswordClick = () => {
        setFormData({
            currentPassword: "",
            newPassword: "",
        });
        setOpenChangePassDialog(true);
    };

    // Close Add Product Dialog
    const handleChangePasswordClose = () => {
        setOpenChangePassDialog(false);
    };

    // Handle Form Input Change
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Submit New Product
    const handleChangePasswordSubmit = async (e) => {
        e.preventDefault();

        setIsButtonClicked(true);
        const message = await handleChangePassword(formData.currentPassword, formData.newPassword);

        if (message === "") {
            alert("Change password successfully !");
        } else {
            alert(`Change password failed ! ${message}`);
        }
        setIsButtonClicked(false);
    };

    const handleCheckboxChange = (event) => {
        setIsConfirmed(event.target.checked);
    };

    return (
        <div style={styles.sidebar}>
            <div style={styles.profileSection}>
                <img src={userLogo} style={styles.avatar}></img>
                <h3 style={styles.username}>{userDetails.username}</h3>
                <p style={styles.email}>{userDetails.email}</p>
                <StyledButton
                    style={styles.button}
                    onClick={handleChangePasswordClick}
                >
                    Change password
                </StyledButton>
            </div>
            <div style={styles.nav}>
            <div style={styles.navItem} onClick={() => handleClick("myorders")}>
                    <StyledLinkSpan color={option === "myorders" ? "#C14859" : "#000"}>My Orders</StyledLinkSpan>
                </div>
                <div style={styles.navItem} onClick={() => handleClick("myitems")}>
                    <StyledLinkSpan color={option === "myitems" ? "#C14859" : "#000"}>My Items</StyledLinkSpan>
                </div>
            </div>

            {openChangePassDialog && (
                <>
                    <PopUpDialog>
                        <h2 style={ styles.title }>Change your password</h2>

                        <form onSubmit={ handleChangePasswordSubmit }>
                            <div style={ styles.inputField }>
                                <label><strong>Current password:</strong></label>
                                <GenericInput
                                    type="password"
                                    name="currentPassword"
                                    value={ formData.currentPassword }
                                    onChange={ handleFormChange }
                                    required={ true }
                                />
                            </div>
                            <div style={ styles.inputField }>
                                <label><strong>New password:</strong></label>
                                <GenericInput
                                    type="password"
                                    name="newPassword"
                                    value={ formData.newPassword }
                                    onChange={ handleFormChange }
                                    required={ true }
                                />
                            </div>
                            <label style={styles.checkboxField}>
                                <input
                                    type="checkbox"
                                    checked={ isConfirmed }
                                    onChange={ handleCheckboxChange }
                                />
                                Please confirm to proceed.
                            </label>
                            <div style={ styles.buttonContainer }>
                                <StyledButton2
                                    type="submit"
                                    disabled={ !isConfirmed || isButtonClicked }
                                >
                                    Submit
                                </StyledButton2>
                                <StyledButton
                                    type="button"
                                    onClick={ handleChangePasswordClose }
                                >
                                    Cancel
                                </StyledButton>
                            </div>
                        </form>
                    </PopUpDialog>

                    {/* Backdrop */ }
                    <BackDrop onClick={handleChangePasswordClose} />
                </>
            ) }
        </div>
    );
};