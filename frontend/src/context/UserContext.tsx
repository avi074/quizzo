/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "@/types";
import { createContext, useContext, useReducer, ReactNode } from "react"

/**
 * UserState interface representing the state of the user context.
 */
interface UserState {
  user: User | null
}

/**
 * Initial state of the user context.
 */
const initialUserState: UserState = { user: null }

/**
 * Reducer function to handle user state changes.
 *
 * @param state - The current state of the user context.
 * @param action - The action to be performed on the state.
 * @returns The new state of the user context.
 */
function userReducer(state: UserState, action: any): UserState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload }
    case "LOGOUT":
      return { ...state, user: null }
    default:
      return state
  }
}

/**
 * UserContext to provide user state and dispatch function.
 */
const UserContext = createContext<
  { state: UserState; dispatch: React.Dispatch<any> } | undefined
>(undefined)

/**
 * UserProvider component to wrap around components that need access to user context.
 *
 * @param children - The child components that need access to the user context.
 * @returns The UserContext provider with state and dispatch.
 */
export function UserProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(userReducer, initialUserState)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}

/**
 * Custom hook to use the UserContext.
 *
 * @returns The user context value containing state and dispatch.
 * @throws Error if used outside of a UserProvider.
 */
export function useUser() {
  const context = useContext(UserContext)
  if (!context) throw new Error("useUser must be used within a UserProvider")
  return context
}
