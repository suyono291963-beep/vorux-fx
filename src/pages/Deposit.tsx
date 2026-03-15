import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, doc, getDoc, addDoc, query, where, onSnapshot } from 'firebase/firestore';
import { ArrowLeft, Upload, CheckCircle2, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Deposit() {
  const { user, userData } = useAuth();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('qris');
  const [adminSettings, setAdminSettings] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [deposits, setDeposits] = useState<any[]>([]);

  useEffect(() => {
    const fetchSettings = async () => {
      const docRef = doc(db, 'admin_settings', 'deposit_methods');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setAdminSettings(docSnap.data());
      }
    };
    fetchSettings();

    if (user) {
      const q = query(collection(db, 'deposits'), where('userId', '==', user.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const depData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
        setDeposits(depData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      });
      return () => unsubscribe();
    }
  }, [user]);

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    const minAmount = method === 'qris' ? 2000000 : 125;
    if (!user || !amount || isNaN(Number(amount)) || Number(amount) < minAmount) {
      alert(`Minimal deposit untuk ${method.toUpperCase()} adalah ${method === 'qris' ? 'Rp 2.000.000' : '$125'}`);
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'deposits'), {
        userId: user.uid,
        amount: Number(amount),
        method,
        status: 'pending',
        createdAt: new Date().toISOString()
      });
      setSuccess(true);
      setAmount('');
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting deposit:", error);
      alert("Gagal memproses deposit.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans">
      <nav className="border-b border-white/5 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center gap-4">
          <Link to="/dashboard" className="p-2 -ml-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <span className="text-lg font-semibold tracking-tight">Deposit Dana</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-6">
            <h3 className="text-xl font-semibold mb-6">Formulir Deposit</h3>
            
            {success && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3 text-emerald-400 text-sm">
                <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                <p>Permintaan deposit berhasil dikirim. Menunggu konfirmasi admin.</p>
              </div>
            )}

            <form onSubmit={handleDeposit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  {method === 'qris' ? 'Jumlah Deposit (IDR)' : 'Jumlah Deposit (USD)'}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                    {method === 'qris' ? 'Rp' : '$'}
                  </span>
                  <input 
                    type="number" 
                    required
                    min={method === 'qris' ? "2000000" : "125"}
                    step={method === 'qris' ? "1" : "0.01"}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                    placeholder={method === 'qris' ? "2000000" : "125.00"}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  Minimal deposit: <span className="text-slate-300 font-medium">{method === 'qris' ? 'Rp 2.000.000' : '$125'}</span>
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Metode Pembayaran</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setMethod('qris')}
                    className={`p-4 rounded-xl border text-center transition-all ${method === 'qris' ? 'bg-blue-600/10 border-blue-500 text-blue-400' : 'bg-slate-950 border-white/10 text-slate-400 hover:border-white/20'}`}
                  >
                    <div className="font-semibold mb-1">QRIS</div>
                    <div className="text-xs opacity-70">Instan</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMethod('usdt')}
                    className={`p-4 rounded-xl border text-center transition-all ${method === 'usdt' ? 'bg-blue-600/10 border-blue-500 text-blue-400' : 'bg-slate-950 border-white/10 text-slate-400 hover:border-white/20'}`}
                  >
                    <div className="font-semibold mb-1">USDT (TRC20)</div>
                    <div className="text-xs opacity-70">Kripto</div>
                  </button>
                </div>
              </div>

              {/* Payment Instructions */}
              <div className="p-4 rounded-xl bg-slate-950 border border-white/5">
                <h4 className="text-sm font-medium text-slate-300 mb-3">Instruksi Pembayaran</h4>
                {method === 'qris' ? (
                  <div className="text-sm text-slate-400">
                    <p className="mb-2">Silakan scan QRIS berikut menggunakan aplikasi e-wallet atau m-banking Anda.</p>
                    {adminSettings?.qrisUrl ? (
                      <img src={adminSettings.qrisUrl} alt="QRIS" className="w-48 h-48 object-cover rounded-lg mx-auto bg-white p-2" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-48 h-48 bg-slate-800 rounded-lg mx-auto flex items-center justify-center text-slate-500">QRIS Belum Diatur</div>
                    )}
                  </div>
                ) : (
                  <div className="text-sm text-slate-400">
                    <p className="mb-2">Kirim USDT ke alamat TRC20 berikut:</p>
                    <div className="p-3 bg-slate-900 rounded-lg font-mono text-xs break-all text-blue-400 border border-white/5">
                      {adminSettings?.usdtAddress || 'Alamat USDT belum diatur'}
                    </div>
                  </div>
                )}
              </div>

              <button 
                type="submit" 
                disabled={loading || !amount}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Upload size={18} />
                {loading ? 'Memproses...' : 'Konfirmasi Deposit'}
              </button>
            </form>
          </div>

          {/* History */}
          <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-6">
            <h3 className="text-xl font-semibold mb-6">Riwayat Deposit</h3>
            
            {deposits.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <Clock size={24} className="mx-auto mb-3 opacity-50" />
                <p>Belum ada riwayat deposit.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {deposits.map((dep) => (
                  <div key={dep.id} className="p-4 rounded-xl bg-slate-950 border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="font-mono font-medium text-lg">
                        {dep.method === 'qris' ? `Rp ${dep.amount.toLocaleString('id-ID')}` : `$${dep.amount.toFixed(2)}`}
                      </div>
                      <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                        <span className="uppercase">{dep.method}</span>
                        <span>•</span>
                        <span>{new Date(dep.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                    </div>
                    <div>
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        dep.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' :
                        dep.status === 'rejected' ? 'bg-red-500/10 text-red-400' :
                        'bg-amber-500/10 text-amber-400'
                      }`}>
                        {dep.status === 'approved' ? 'Berhasil' : 
                         dep.status === 'rejected' ? 'Ditolak' : 'Pending'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
