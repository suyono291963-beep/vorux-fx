import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db, auth } from '../firebase';
import { collection, doc, getDoc, setDoc, updateDoc, query, onSnapshot, orderBy } from 'firebase/firestore';
import { Settings, Users, CreditCard, LogOut, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const { user, userData } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('deposits');
  
  // Settings State
  const [qrisUrl, setQrisUrl] = useState('');
  const [usdtAddress, setUsdtAddress] = useState('');
  const [savingSettings, setSavingSettings] = useState(false);

  // Data State
  const [deposits, setDeposits] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    if (!user || userData?.role !== 'admin') return;

    // Fetch Settings
    const fetchSettings = async () => {
      const docRef = doc(db, 'admin_settings', 'deposit_methods');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setQrisUrl(docSnap.data().qrisUrl || '');
        setUsdtAddress(docSnap.data().usdtAddress || '');
      }
    };
    fetchSettings();

    // Listen to Deposits
    const qDeposits = query(collection(db, 'deposits'));
    const unsubDeposits = onSnapshot(qDeposits, (snapshot) => {
      const depData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      setDeposits(depData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    });

    // Listen to Users
    const qUsers = query(collection(db, 'users'));
    const unsubUsers = onSnapshot(qUsers, (snapshot) => {
      const userData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(userData);
    });

    return () => {
      unsubDeposits();
      unsubUsers();
    };
  }, [user, userData]);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      await setDoc(doc(db, 'admin_settings', 'deposit_methods'), {
        qrisUrl,
        usdtAddress,
        updatedAt: new Date().toISOString()
      });
      alert('Pengaturan berhasil disimpan');
    } catch (error) {
      console.error("Error saving settings:", error);
      alert('Gagal menyimpan pengaturan');
    } finally {
      setSavingSettings(false);
    }
  };

  const handleDepositAction = async (depositId: string, userId: string, amount: number, action: 'approved' | 'rejected') => {
    try {
      // Update deposit status
      await updateDoc(doc(db, 'deposits', depositId), {
        status: action
      });

      // If approved, update user balance
      if (action === 'approved') {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const currentBalance = userSnap.data().balance || 0;
          await updateDoc(userRef, {
            balance: currentBalance + amount
          });
        }
      }
    } catch (error) {
      console.error("Error updating deposit:", error);
      alert('Gagal memproses deposit');
    }
  };

  const handleLogout = () => {
    auth.signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-slate-950/50 p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-12">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-xl tracking-tighter">
            V
          </div>
          <span className="text-xl font-semibold tracking-tight">Admin Panel</span>
        </div>

        <nav className="flex-1 space-y-2">
          <button 
            onClick={() => setActiveTab('deposits')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'deposits' ? 'bg-blue-600/10 text-blue-400' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <CreditCard size={18} />
            Kelola Deposit
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'users' ? 'bg-blue-600/10 text-blue-400' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Users size={18} />
            Daftar Klien
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === 'settings' ? 'bg-blue-600/10 text-blue-400' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <Settings size={18} />
            Pengaturan
          </button>
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors mt-auto"
        >
          <LogOut size={18} />
          Keluar
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === 'deposits' && (
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Permintaan Deposit</h2>
            <div className="bg-slate-900/50 border border-white/5 rounded-3xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-slate-400 text-sm border-b border-white/5 bg-slate-950/50">
                    <th className="p-4 font-medium">Tanggal</th>
                    <th className="p-4 font-medium">User ID</th>
                    <th className="p-4 font-medium">Metode</th>
                    <th className="p-4 font-medium">Jumlah</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {deposits.length === 0 ? (
                    <tr><td colSpan={6} className="p-8 text-center text-slate-500">Tidak ada data deposit</td></tr>
                  ) : deposits.map((dep) => (
                    <tr key={dep.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                      <td className="p-4 text-slate-400">{new Date(dep.createdAt).toLocaleString('id-ID')}</td>
                      <td className="p-4 font-mono text-xs text-slate-500">{dep.userId}</td>
                      <td className="p-4 uppercase">{dep.method}</td>
                      <td className="p-4 font-mono font-medium text-blue-400">${dep.amount.toFixed(2)}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                          dep.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' :
                          dep.status === 'rejected' ? 'bg-red-500/10 text-red-400' :
                          'bg-amber-500/10 text-amber-400'
                        }`}>
                          {dep.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {dep.status === 'pending' && (
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleDepositAction(dep.id, dep.userId, dep.amount, 'approved')}
                              className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                              title="Setujui"
                            >
                              <Check size={16} />
                            </button>
                            <button 
                              onClick={() => handleDepositAction(dep.id, dep.userId, dep.amount, 'rejected')}
                              className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                              title="Tolak"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Daftar Klien</h2>
            <div className="bg-slate-900/50 border border-white/5 rounded-3xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-slate-400 text-sm border-b border-white/5 bg-slate-950/50">
                    <th className="p-4 font-medium">Nama</th>
                    <th className="p-4 font-medium">Email</th>
                    <th className="p-4 font-medium">Role</th>
                    <th className="p-4 font-medium text-right">Saldo</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {users.map((u) => (
                    <tr key={u.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                      <td className="p-4 font-medium">{u.name}</td>
                      <td className="p-4 text-slate-400">{u.email}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${u.role === 'admin' ? 'bg-purple-500/10 text-purple-400' : 'bg-blue-500/10 text-blue-400'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4 text-right font-mono font-medium">${u.balance?.toFixed(2) || '0.00'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Pengaturan Deposit</h2>
            <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-6">
              <form onSubmit={handleSaveSettings} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">URL Gambar QRIS</label>
                  <input 
                    type="url" 
                    value={qrisUrl}
                    onChange={(e) => setQrisUrl(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    placeholder="https://example.com/qris.png"
                  />
                  <p className="text-xs text-slate-500 mt-2">Masukkan link gambar QRIS yang valid.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Alamat Wallet USDT (TRC20)</label>
                  <input 
                    type="text" 
                    value={usdtAddress}
                    onChange={(e) => setUsdtAddress(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono text-sm"
                    placeholder="T..."
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={savingSettings}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-6 rounded-xl transition-all disabled:opacity-50"
                >
                  {savingSettings ? 'Menyimpan...' : 'Simpan Pengaturan'}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
