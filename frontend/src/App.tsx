import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { UserProvider, useUser } from "./context/UserContext";
import { QuizProvider } from "./context/QuizContext";
import Loader from "./components/Loader";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const QuizForm = lazy(() => import("./pages/QuizForm"));
const NotFound = lazy(() => import("./pages/NotFound"));

function withAuth(Component: React.ComponentType) {
  return function ProtectedComponent() {
    const { state } = useUser();
    return state.user ? <Component /> : <Navigate to="/" replace />;
  };
}

const ProtectedDashboard = withAuth(Dashboard);
const ProtectedQuizForm = withAuth(QuizForm);

export default function AppRouter() {
  return (
    <UserProvider>
      <QuizProvider>
        <Router>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<ProtectedDashboard />} />
              <Route path="/quiz/:id?" element={<ProtectedQuizForm />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Router>
      </QuizProvider>
    </UserProvider>
  );
}
