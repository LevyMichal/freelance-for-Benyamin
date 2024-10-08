import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import usersOfOrgData from "../../../mockData/usersOfOrgData"; // Mock data

import useAxios from "../../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import Table from "../../common/Table";
import usersColumns from "./UsersTableColumns";
import FilterSearch from "../../common/FilterSearch";
import Button from "../../common/Button";

const tableSize = 10;

export default function UsersTable({ org }) {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    const axiosInstance = useAxios();
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const userRole = useSelector((store) => store.user.currentUser?.role);

    useEffect(() => {
        if (userRole === "SUPERADMIN") {
            loadMoreData();
        }
    }, [userRole]);

    const loadMoreData = async () => {
        // mock data fetch
        const usersOfCurrentOrg = usersOfOrgData.find(orgData => orgData.orgId === org.id)
        const nextIndex = currentIndex + tableSize;
        const moreUsers = usersOfCurrentOrg.users.slice(currentIndex, nextIndex);

        if (moreUsers.length === 0) {
            setHasMore(false);
        } else {
            setUsers([...users, ...moreUsers]);
            setCurrentIndex(nextIndex);
        }
    };

    const handleRowClick = (record) => {
        // TODO: handleRowClick
    };

    const handleFilter = (e) => {
        const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(e.toLowerCase()));
        setFilteredUsers(filteredUsers);
    };

    const handleNewUser = () => {
        // TODO: handleNewUser
    }

    return (
        <div>
            <div className="flex flex-row items-center justify-center mb-4">
                <div className="flex">
                    <p className="text-xl pt-1 font-bold mr-4">All Users</p>
                    <Button text={"+ New User"} onClick={handleNewUser} />

                </div>
                <div className="flex-1 ">
                    <p className="text-center -ml-40 text-2xl font-bold text-violet-500">{org.name}</p>
                </div>
                <FilterSearch onFilter={handleFilter} />
            </div>

            <div className="border-x-2 border-t-2 border-neutral-100 rounded-t-xl px-8 pt-8" >

                <Table
                    columns={usersColumns}
                    data={filteredUsers.length ? filteredUsers : users}
                    onRowClick={handleRowClick}
                    loadMoreData={loadMoreData}
                    hasMore={hasMore}
                />

            </div>
        </div>
    );
}
