import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../apiConfig";
import { Shield, Lock, Mail, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFillDemo = () => {
    setEmail("admin@eyauto.com");
    setPassword("admin123");
    setErrorMsg("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/admin/login`, {
        email,
        password,
      });

      if (res.data?.success && res.data.token) {
        localStorage.setItem("adminToken", res.data.token);
        localStorage.setItem("adminUser", JSON.stringify(res.data.admin));
        navigate("/admin");
      }
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || "Invalid admin credentials. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="max-w-md w-full bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="bg-black/50 p-6 text-center border-b border-slate-700/60">
          <div className="w-14 h-14 bg-yellow-400 text-black rounded-2xl flex items-center justify-center mx-auto shadow-lg mb-3">
            <Shield size={28} />
          </div>
          <h1 className="text-2xl font-black text-white">
            Ey<span className="text-yellow-400">Auto</span> Admin Portal
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Town Mobility & Fleet Operations Management
          </p>
        </div>

        {/* Form Body */}
        <div className="p-8 space-y-5">
          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3.5 rounded-xl text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  required
                  placeholder="admin@eyauto.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock size={16} />
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-yellow-400 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold py-3.5 px-4 rounded-xl shadow-lg transition duration-200 flex items-center justify-center gap-2 mt-6 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In as Admin</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access */}
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700/60 text-center">
            <p className="text-xs text-slate-400 mb-2">
              Default Credentials: <span className="text-yellow-400 font-mono">admin@eyauto.com</span> / <span className="text-yellow-400 font-mono">admin123</span>
            </p>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-xs text-yellow-400 hover:text-yellow-300 font-bold underline"
            >
              Autofill Credentials
            </button>
          </div>

          <div className="text-center pt-2">
            <Link
              to="/"
              className="text-xs text-slate-500 hover:text-slate-300 flex items-center justify-center gap-1.5"
            >
              <ArrowLeft size={14} />
              <span>Return to Public Homepage</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
