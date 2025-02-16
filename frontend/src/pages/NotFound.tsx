import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-gray-500 mt-2">Oops! The page you are looking for does not exist.</p>
      <Button className="mt-4" onClick={() => navigate("/")}>Go to Home</Button>
    </div>
  );
}
