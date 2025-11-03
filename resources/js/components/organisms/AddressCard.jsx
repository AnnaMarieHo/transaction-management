import React, { useState } from "react";
import PersonalCard from "../molecules/PersonalCard";
import CompanyCard from "../molecules/CompanyCard";

const AddressCard = ({ addresses }) => {
    const [edit, setEdit] = useState(false);

    console.log("ADDRESSES: ", addresses);
    const onEdit = () => {
        setEdit(!edit);
    };

    return (
        <>
            <PersonalCard
                key={addresses.id}
                firstName={addresses.first_name}
                lastName={addresses.last_name}
                phone={addresses.phone}
                company={addresses.company}
                edit={edit}
            />
            <CompanyCard
                key={addresses.id}
                roomNum={addresses.roomNum}
                addressLine1={addresses.address_line1}
                addressLine2={addresses.address_line2}
                city={addresses.city}
                state={addresses.state}
                zip={addresses.zip}
                onEdit={onEdit}
                edit={edit}
            />
        </>
    );
};

export default AddressCard;
