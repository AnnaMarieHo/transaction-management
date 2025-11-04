import React, { useEffect, useState } from "react";
import PersonalCard from "../molecules/PersonalCard";
import CompanyCard from "../molecules/CompanyCard";
import { FaRegTrashAlt } from "react-icons/fa";

const AddressCard = ({ addresses, editAddress, deleteAddress }) => {
    const [edit, setEdit] = useState(false);
    const [editSuccessful, setEditSuccessful] = useState("");

    const onEdit = (message) => {
        setEdit(!edit);
        setEditSuccessful(message);
        if (editSuccessful === "successful") {
            setEdit(false);
        }
    };

    const onDelete = (id) => {
        console.log(id);
        deleteAddress(id);
    };

    return (
        <div className="flex flex-col w-full py-1 items-start justify-between">
            <button
                onClick={() => onDelete(addresses.id)}
                className="flex flex-col w-full items-end justify-between p-1 pr-3 bg-blue-100 "
            >
                <FaRegTrashAlt className="border-slate-500 w-7 h-7 border rounded-md bg-slate-200 opacity-45 text-slate-500 p-1 " />
            </button>
            <PersonalCard
                editAddress={editAddress}
                id={addresses.id}
                firstName={addresses.first_name}
                lastName={addresses.last_name}
                phone={addresses.phone}
                company={addresses.company}
                edit={edit}
            />
            <CompanyCard
                editAddress={editAddress}
                id={addresses.id}
                roomNum={addresses.room_num}
                addressLine1={addresses.address_line1}
                addressLine2={addresses.address_line2}
                city={addresses.city}
                state={addresses.state}
                zip={addresses.zip}
                onEdit={onEdit}
                edit={edit}
            />
        </div>
    );
};

export default AddressCard;
