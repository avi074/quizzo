import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useQuiz } from "@/context/QuizContext"

const quizSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
})

type QuizFormInputs = z.infer<typeof quizSchema>

/**
 * QuizForm component allows users to create or edit a quiz.
 * 
 * This component uses React Hook Form for form handling and validation,
 * and Zod for schema validation. It retrieves the quiz ID from the URL
 * parameters and fetches the corresponding quiz data from the state if
 * available. The form is pre-filled with the quiz data if editing, otherwise
 * it starts with default values.
 * 
 * On form submission, it dispatches an action to either update an existing
 * quiz or add a new quiz to the state, and then navigates the user to the
 * dashboard.
 * 
 * @returns {JSX.Element} The rendered QuizForm component.
 */
export default function QuizForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state, dispatch } = useQuiz()
  const quiz = id ? state.quizzes.find((q) => q.id.toString() === id) : null

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<QuizFormInputs>({
    resolver: zodResolver(quizSchema),
    defaultValues: quiz || { title: "", description: "" },
  })

  useEffect(() => {
    if (quiz) {
      setValue("title", quiz.title)
      setValue("description", quiz.description)
    }
  }, [quiz, setValue])

  const onSubmit = (data: QuizFormInputs) => {
    if (id) {
      dispatch({ type: "UPDATE_QUIZ", payload: { ...data, id: Number(id) } })
    } else {
      dispatch({ type: "ADD_QUIZ", payload: { ...data, id: Date.now() } })
    }
    navigate("/dashboard")
  }

  return (
    <Card className='w-full max-w-md mx-auto mt-10 p-4 shadow-lg'>
      <CardHeader className="text-lg">
        <CardTitle>{id ? "Edit Quiz" : "Create Quiz"}</CardTitle>
        <CardDescription>Enter the details of the quiz</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <Label htmlFor='title'>Title</Label>
            <Input id='title' {...register("title")} />
            {errors.title && (
              <p className='text-red-500 text-sm'>{errors.title.message}</p>
            )}
          </div>
          <div className='mb-4'>
            <Label htmlFor='description'>Description</Label>
            <Input id='description' {...register("description")} />
            {errors.description && (
              <p className='text-red-500 text-sm'>
                {errors.description.message}
              </p>
            )}
          </div>
          <Button type='submit' className='w-full mt-2 bg-blue-500 hover:bg-blue-600 font-mono font-semibold text-lg tracking-wide'>
            {id ? "Update Quiz" : "Create Quiz"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
