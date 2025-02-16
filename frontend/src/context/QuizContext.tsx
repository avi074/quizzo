/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useReducer, ReactNode } from "react"

// Quiz Context
interface Quiz {
  id: number
  title: string
  description: string
  createdAt: string
}
interface QuizState {
  quizzes: Quiz[]
}

const initialQuizState: QuizState = { quizzes: [] }

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

export function useQuiz() {
  const context = useContext(QuizContext)
  if (!context) throw new Error("useQuiz must be used within a QuizProvider")
  return context
}
