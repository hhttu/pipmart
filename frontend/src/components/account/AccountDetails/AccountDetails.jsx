import { AccountContent, StyledButton } from "@components/styledComponents.js";
import { styles } from "@components/account/AccountDetails/styles.js";
import { useEffect, useState } from "react";
import { GenericInput } from "@components/common/GenericInput/GenericInput.jsx";
import { useUser } from "@context/UserContext.jsx";
import { users } from "../../../constants.js";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineSaveAlt } from "react-icons/md";


export const AccountDetails = () => {
    const [accountData, setAccountData] = useState({
        name: "",
        username: "",
        password: "",
        email: "",
    });

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(accountData);

    const { userId } = useUser();

    // Will be replaced by API call
    useEffect(() => {
        const user = users.find((p) => p.id === userId);
        if (user) {
            setAccountData(user);
            setFormData(user);
        }
    }, []);

    // Toggle Edit Mode
    const handleEditClick = () => {
        setFormData(accountData); // Reset form data to current account data
        setIsEditing(true);
    };

    // Handle Save Changes
    const handleSaveClick = () => {
        setAccountData(formData); // Save changes
        setIsEditing(false); // Exit edit mode
    };

    // Handle Form Input Changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <AccountContent>
            <div style={ styles.headerContainer }>
                <h2 style={ styles.title }>My Account</h2>
                <div style={styles.button}>
                    { !isEditing ? (
                        <StyledButton onClick={ handleEditClick }>
                            <FaRegEdit style={styles.icon} />
                            Edit
                        </StyledButton>
                    ) : (
                        <StyledButton onClick={ handleSaveClick }>
                            <MdOutlineSaveAlt style={styles.icon} />
                            Save
                        </StyledButton>
                    ) }
                </div>
            </div>
            <div>
                <div style={ styles.inputField }>
                    <label><strong>Name:</strong></label>
                    <GenericInput
                        type="text"
                        name="name"
                        value={ formData.name }
                        onChange={ handleInputChange }
                        disabled={ !isEditing }
                    />
                </div>
                <div style={styles.inputField }>
                    <label><strong>Username:</strong></label>
                    <GenericInput
                        type="text"
                        name="username"
                        value={ formData.username }
                        onChange={ handleInputChange }
                        disabled={ !isEditing }
                    />
                </div>
                <div style={styles.inputField }>
                    <label><strong>Email:</strong></label>
                    <GenericInput
                        type="email"
                        name="email"
                        value={ formData.email }
                        onChange={ handleInputChange }
                        disabled={ !isEditing }
                    />
                </div>
                <div style={styles.inputField }>
                    <label><strong>Password:</strong></label>
                    <GenericInput
                        type="password"
                        name="password"
                        value={ formData.password }
                        onChange={ handleInputChange }
                        disabled={ !isEditing }
                    />
                </div>
            </div>
        </AccountContent>
    );
};