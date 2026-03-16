import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'motion/react';
import { AlertCircle } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // LOGIN FIREBASE AUTH
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      let role = "client";

      // COBA AMBIL DATA USER DARI FIRESTORE
      try {
        const userRef = doc(db, "users", userCredential.user.uid);
        const snap = await getDoc(userRef);

        if (snap.exists()) {
          role = snap.data().role || "client";
        }
      } catch (firestoreError) {
        console.log("Firestore gagal diakses, login tetap lanjut:", firestoreError);
      }

      // REDIRECT BERDASARKAN ROLE
      if (role === "admin" || userCredential.user.email === "antonsevenn@gmail.com") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Gagal login. Periksa email dan password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-slate-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >

        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-2xl">
              V
            </div>
            <span className="text-2xl font-semibold">Vorux FX</span>
          </Link>

          <h1 className="text-3xl font-bold mb-2">Selamat Datang</h1>
          <p className="text-slate-400">Masuk ke akun trading Anda</p>
        </div>

        <div className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex gap-3 text-red-400 text-sm">
              <AlertCircle size={18}/>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">

            <div>
              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3"
                placeholder="nama@email.com"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-xl font-medium disabled:opacity-50"
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>

          </form>

          <p className="text-center text-slate-400 text-sm mt-8">
            Belum punya akun?{" "}
            <Link to="/register" className="text-blue-400">
              Daftar sekarang
            </Link>
          </p>

        </div>
      </motion.div>
    </div>
  );
}

