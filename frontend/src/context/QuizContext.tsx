/* eslint-disable @typescript-eslint/no-explicit-any */
import { Quiz } from "@/types";
import { createContext, useContext, useReducer, ReactNode } from "react"


/**
 * Represents the state of the quiz context.
 * 
 * @interface QuizState
 * @property {Quiz[]} quizzes - An array of quizzes.
 */
interface QuizState {
  quizzes: Quiz[]
}

const initialQuizState: QuizState = { quizzes: [] }

/**
 * Reducer function to manage the state of quizzes.
 *
 * @param {QuizState} state - The current state of the quizzes.
 * @param {any} action - The action to be performed on the state.
 * @returns {QuizState} The new state after the action is applied.
 *
 * The reducer handles the following action types:
 * - "SET_QUIZZES": Sets the quizzes in the state to the payload.
 * - "ADD_QUIZ": Adds a new quiz to the state.
 * - "UPDATE_QUIZ": Updates an existing quiz in the state.
 * - "DELETE_QUIZ": Deletes a quiz from the state.
 */
function quizReducer(state: QuizState, action: any): QuizState {
  switch (action.type) {
    case "SET_QUIZZES":
      return { ...state, quizzes: action.payload }
    case "ADD_QUIZ":
      return { ...state, quizzes: [...state.quizzes, action.payload] }
    case "UPDATE_QUIZ":
      return {
        ...state,
        quizzes: state.quizzes.map((q) =>
          q.id === action.payload.id ? action.payload : q,
        ),
      }
    case "DELETE_QUIZ":
      return {
        ...state,
        quizzes: state.quizzes.filter((q) => q.id !== action.payload),
      }
    default:
      return state
  }
}

const QuizContext = createContext<
  { state: QuizState; dispatch: React.Dispatch<any> } | undefined
>(undefined)

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialQuizState)
  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  )
}

/**
 * Custom hook to access the Quiz context.
 * 
 * This hook provides access to the Quiz context, ensuring that it is used within a QuizProvider.
 * If the hook is used outside of a QuizProvider, it will throw an error.
 * 
 * @returns {QuizContextType} The current context value for the Quiz.
 * @throws {Error} If the hook is used outside of a QuizProvider.
 */
export function useQuiz() {
  const context = useContext(QuizContext)
  if (!context) throw new Error("useQuiz must be used within a QuizProvider")
  return context
}
