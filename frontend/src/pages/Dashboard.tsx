import { useEffect, useState } from "react";
import { Button } from "@/components//ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface Quiz {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/quizzes")
      .then((res) => res.json())
      .then((data) => setQuizzes(data))
      .catch((err) => console.error("Failed to fetch quizzes", err));
  }, []);

  return (
    <div className="w-full mx-auto mt-10 p-4">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="mb-4" onClick={() => navigate("/quiz")}>Create New Quiz</Button>
          {quizzes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quizzes.map((quiz) => (
                <Card key={quiz.id} className="p-4 shadow-md">
                  <CardHeader>
                    <CardTitle>{quiz.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{quiz.description}</p>
                    <p className="text-sm text-gray-500">Created: {new Date(quiz.createdAt).toLocaleDateString()}</p>
                    <div className="mt-2 flex gap-2">
                      <Button onClick={() => navigate(`/quiz/${quiz.id}`)}>Edit</Button>
                      <Button variant="destructive" onClick={() => console.log("Delete", quiz.id)}>Delete</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p>No quizzes available. Create one!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
