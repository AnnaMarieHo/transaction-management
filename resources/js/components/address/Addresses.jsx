import React from "react";
import { useAddress } from "../../hooks/useAddress";
import PersonalCard from "./PersonalCard";
import CompanyCard from "./CompanyCard";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";

const Addresses = () => {
    const { addresses } = useAddress();

    return (
        <div className="flex-col flex w-full max-w-md shadow-2xl shadow-black/20 rounded-md bg-orange-100 content-center px-4 ml-4">
            {addresses.map((addresses) => {
                return (
                    <>
                        <CompanyCard
                            addresses={addresses}
                            key={addresses.id}
                            roomNum={addresses.room_num}
                            address={addresses.address}
                            state={addresses.state}
                            city={addresses.city}
                            zip={addresses.zip}
                        />
                    </>
                );
            })}
        </div>
    );
};

export default Addresses;
