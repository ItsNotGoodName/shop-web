import React, { createContext, useContext, useEffect, useState } from "react";
import userService from "./services/userService";
import { UserType } from "./types";

type UserContextType = UserType | undefined;

const UserContextState = createContext<UserContextType>(undefined);
// @ts-ignore
const UserContextSetState = createContext<
  React.Dispatch<React.SetStateAction<UserContextType>>
>();

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserContextType>(undefined);

  useEffect(() => {
    userService
      .me()
      .then((data) => {
        if (data.errors) {
          return;
        }
        setUser(data.user);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  return (
    <UserContextState.Provider value={user}>
      <UserContextSetState.Provider value={setUser}>
        {children}
      </UserContextSetState.Provider>
    </UserContextState.Provider>
  );
};

export const useUserState = () => {
  return useContext(UserContextState);
};

export const useUserSetState = () => {
  return useContext(UserContextSetState);
};
