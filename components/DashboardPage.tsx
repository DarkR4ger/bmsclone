"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/lib/reduxhook";
import { setUser } from "@/redux/userSlice";

export interface UserData {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

const DashboardPage = ({ id, username, email, isAdmin }: UserData) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userData = {
      id: id,
      username: username,
      email: email,
      isAdmin: isAdmin,
    };

    dispatch(setUser(userData));
  }, [id, username, email, isAdmin, dispatch]);

  return (
    <div className="min-h-screen w-full">
      <div>
        <h2 className="text-xl md:text-2xl font-semibold">
          Welcome <span className="text-primary">{username}</span> <span className="">👋</span>
        </h2>
      </div>
    </div>
  );
};

export default DashboardPage;
