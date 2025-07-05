import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import { useAuthContext } from "../context/AuthContext";


export default function AuthPage() {
  const { authMode, setAuthMode } = useAuthContext();

  return (
    <div className="flex items-center h-[90vh]">
      <div className="w-full max-w-lg rounded-md px-12 py-4">
        <h3 className="text-2xl text-primary font-bold w-fit mx-auto pb-2 border-b-4 border-primary">{authMode === "login" ? "Login" : "Sign Up"}</h3>
        {authMode === "login" ? <Login /> : <SignUp />}
        <div className="mt-4 text-center text-sm">
          {authMode === "login" ? (
            <span>
              Don’t have an account?{" "}
              <button
                className="text-primary font-semibold underline cursor-pointer hover:text-secondary"
                onClick={() => setAuthMode("signup")}
              >
                Sign Up
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <button
                className="text-primary font-semibold underline cursor-pointer hover:text-secondary"
                onClick={() => setAuthMode("login")}
              >
                Login
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
