import { LoginForm } from "./LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl mx-auto flex items-center justify-center shadow-lg mb-4">
            <span className="text-white font-bold text-2xl">TW</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-outfit">Admin Access</h1>
          <p className="text-slate-400 mt-2">Sign in to manage Think Wise Careers</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
