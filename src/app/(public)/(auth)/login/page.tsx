"use client";
import LoginForm from "./components/login-form";

export default function Page() {
  return <Login />;
}

function Login() {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <LoginForm />
    </div>
  );
}
