import "./TodoApp.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LogoutComponent from "./LogoutComponent";
import HeaderComponent from "./HeaderComponent";
import ListComponent from "./ListTodosComponent";
import ErrorComponent from "./ErrorComponent";
import WelcomeComponent from "./WelcomeComponent";
import LoginComponent from "./LoginComponent";
import TodoComponent from "./TodoComponent";
import AuthProvider, { useAuth } from "./security/AuthContext";

function AthentecatedRoute({ children }) {
  const authContext = useAuth();
  if (authContext.isAthentecated) return children;
  return <Navigate to="/login" />;
}

export default function Todo() {
  return (
    <div className="TodoApp">
      <AuthProvider>
        <BrowserRouter>
          <HeaderComponent />
          <Routes>
            <Route path="/login" element={<LoginComponent />} />
            <Route
              path="/welcome/:username"
              element={
                <AthentecatedRoute>
                  <WelcomeComponent />
                </AthentecatedRoute>
              }
            />

            <Route
              path="/todos"
              element={
                <AthentecatedRoute>
                  <ListComponent />
                </AthentecatedRoute>
              }
            />

            <Route
              path="/todo/:id"
              element={
                <AthentecatedRoute>
                  <TodoComponent />
                </AthentecatedRoute>
              }
            />

            <Route
              path="/logout"
              element={
                <AthentecatedRoute>
                  <LogoutComponent />
                </AthentecatedRoute>
              }
            />

            <Route path="*" element={<ErrorComponent />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
