import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

/**
 * NotFound component renders a 404 error page with a message indicating that the requested page was not found.
 * It includes a button to navigate back to the home page.
 *
 * @component
 * @example
 * return (
 *   <NotFound />
 * )
 *
 * @returns {JSX.Element} A React component that displays a 404 error message and a button to navigate to the home page.
 */
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
