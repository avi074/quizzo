/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useReducer, ReactNode } from "react";

// User Context
interface User {
  id: string;
  username: string;
}

interface UserState {
  user: User | null;
}

const initialUserState: UserState = { user: null };

function userReducer(state: UserState, action: any): UserState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
}

const UserContext = createContext<{ state: UserState; dispatch: React.Dispatch<any> } | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(userReducer, initialUserState);
  return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
}
