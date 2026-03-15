import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { auth, db } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { LogOut, Wallet, ArrowUpRight, ArrowDownRight, Activity, TrendingUp, PieChart, BarChart2, Clock } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function Dashboard() {
  const { user, userData } = useAuth();
  const navigate = useNavigate();
  const [positions, setPositions] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'positions'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const posData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPositions(posData);
    });

    return () => unsubscribe();
  }, [user]);

  const handleLogout = () => {
    auth.signOut();
    navigate('/');
  };

  const totalProfit = positions.reduce((acc, pos) => acc + (pos.profit || 0), 0);

  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-50 font-sans selection:bg-blue-500/30">
      {/* Navbar */}
      <nav className="border-b border-white/5 bg-[#0B0E14]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center font-bold text-xl tracking-tighter shadow-lg shadow-blue-500/20">
              V
            </div>
            <span className="text-xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Vorux FX</span>
          </div>
          <div className="flex items-center gap-4">
            {(userData?.role === 'admin' || user?.email === 'antonsevenn@gmail.com') && (
              <Link to="/admin" className="text-sm font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 px-4 py-2 rounded-lg transition-all hidden sm:block">
                Admin Panel
              </Link>
            )}
            <div className="hidden sm:flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-sm text-slate-300">{userData?.name}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Page Header & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Ikhtisar Akun</h1>
            <p className="text-slate-400 text-sm mt-1">Pantau saldo, profit, dan aktivitas trading Anda.</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link to="/dashboard/deposit" className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all shadow-lg shadow-blue-500/20">
              <ArrowDownRight size={18} /> Deposit
            </Link>
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium transition-all border border-white/5">
              <ArrowUpRight size={18} /> Withdraw
            </button>
          </div>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Balance Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-900/50 border border-white/5 rounded-2xl p-5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
            <div className="flex items-center justify-between mb-4 relative">
              <div className="flex items-center gap-2 text-slate-400">
                <Wallet size={18} className="text-blue-400" />
                <h3 className="font-medium text-sm">Saldo Akun</h3>
              </div>
            </div>
            <div className="text-3xl font-bold font-mono tracking-tight relative">
              ${userData?.balance?.toFixed(2) || '0.00'}
            </div>
          </div>

          {/* Profit Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-900/50 border border-white/5 rounded-2xl p-5 relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-110 ${totalProfit >= 0 ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}></div>
            <div className="flex items-center justify-between mb-4 relative">
              <div className="flex items-center gap-2 text-slate-400">
                <TrendingUp size={18} className={totalProfit >= 0 ? "text-emerald-400" : "text-red-400"} />
                <h3 className="font-medium text-sm">Total Profit</h3>
              </div>
            </div>
            <div className={`text-3xl font-bold font-mono tracking-tight relative ${totalProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {totalProfit >= 0 ? '+' : ''}${totalProfit.toFixed(2)}
            </div>
          </div>

          {/* Active Positions */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-900/50 border border-white/5 rounded-2xl p-5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
            <div className="flex items-center justify-between mb-4 relative">
              <div className="flex items-center gap-2 text-slate-400">
                <Activity size={18} className="text-purple-400" />
                <h3 className="font-medium text-sm">Posisi Aktif</h3>
              </div>
            </div>
            <div className="text-3xl font-bold font-mono tracking-tight relative">
              {positions.length}
            </div>
          </div>

          {/* Margin Level */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-900/50 border border-white/5 rounded-2xl p-5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
            <div className="flex items-center justify-between mb-4 relative">
              <div className="flex items-center gap-2 text-slate-400">
                <PieChart size={18} className="text-amber-400" />
                <h3 className="font-medium text-sm">Margin Level</h3>
              </div>
            </div>
            <div className="text-3xl font-bold font-mono tracking-tight relative text-amber-400">
              {userData?.balance > 0 ? '> 1000%' : '0.00%'}
            </div>
          </div>
        </div>

        {/* Middle Section: Chart & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Chart */}
          <div className="lg:col-span-2 bg-slate-900/50 border border-white/5 rounded-3xl p-1 flex flex-col min-h-[400px]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <BarChart2 size={16} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold">XAUUSD</h3>
                  <p className="text-xs text-slate-400">Gold / US Dollar</p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="px-2 py-1 rounded bg-white/5 text-xs font-medium text-slate-300">15m</span>
                <span className="px-2 py-1 rounded bg-emerald-500/10 text-xs font-medium text-emerald-400 flex items-center gap-1"><ArrowUpRight size={12}/> Live</span>
              </div>
            </div>
            <div className="flex-1 rounded-b-3xl overflow-hidden bg-[#0B0E14]">
              <iframe 
                src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_1&symbol=OANDA%3AXAUUSD&interval=15&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=0B0E14&studies=%5B%5D&theme=dark&style=1&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=localhost&utm_medium=widget&utm_campaign=chart&utm_term=OANDA%3AXAUUSD"
                className="w-full h-full border-0"
                title="TradingView Chart"
              ></iframe>
            </div>
          </div>

          {/* Right Column: Market */}
          <div className="flex flex-col gap-6">
            {/* Market Movers */}
            <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-6 flex-1">
              <h3 className="text-sm font-medium text-slate-400 mb-4">Market Movers</h3>
              <div className="space-y-4">
                {[
                  { pair: 'EURUSD', name: 'Euro / US Dollar', price: '1.0942', change: '+0.24%', up: true },
                  { pair: 'GBPUSD', name: 'British Pound', price: '1.2651', change: '-0.12%', up: false },
                  { pair: 'USDJPY', name: 'US Dollar / Yen', price: '149.32', change: '+0.45%', up: true },
                  { pair: 'BTCUSD', name: 'Bitcoin', price: '64,230', change: '+2.10%', up: true },
                ].map((market, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${market.up ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                        {market.up ? <TrendingUp size={14} /> : <ArrowDownRight size={14} />}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{market.pair}</div>
                        <div className="text-xs text-slate-500">{market.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-sm">{market.price}</div>
                      <div className={`text-xs ${market.up ? 'text-emerald-400' : 'text-red-400'}`}>{market.change}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Open Positions Table */}
        <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Clock size={18} className="text-blue-400" /> Posisi Terbuka
            </h3>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {positions.length} Orders
            </span>
          </div>
          
          {positions.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl bg-slate-950/50">
              <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity size={24} className="text-slate-500" />
              </div>
              <p className="text-slate-300 font-medium">Tidak ada posisi terbuka saat ini.</p>
              <p className="text-sm text-slate-500 mt-2 max-w-sm mx-auto">Lakukan deposit dan mulai trading untuk melihat posisi Anda di sini.</p>
              <Link to="/dashboard/deposit" className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors">
                <Wallet size={16} /> Deposit Sekarang
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-slate-400 text-xs uppercase tracking-wider border-b border-white/5">
                    <th className="pb-4 font-medium px-4">Simbol</th>
                    <th className="pb-4 font-medium px-4">Tipe</th>
                    <th className="pb-4 font-medium px-4">Lot</th>
                    <th className="pb-4 font-medium px-4">Harga Buka</th>
                    <th className="pb-4 font-medium px-4">Harga Saat Ini</th>
                    <th className="pb-4 font-medium px-4 text-right">Profit</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {positions.map((pos) => (
                    <tr key={pos.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4 font-semibold flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-[10px] text-slate-400">
                          {pos.symbol.substring(0, 1)}
                        </div>
                        {pos.symbol}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold ${pos.type === 'buy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                          {pos.type === 'buy' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                          {pos.type.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-mono text-slate-300">{pos.lotSize}</td>
                      <td className="py-4 px-4 font-mono text-slate-300">{pos.openPrice.toFixed(2)}</td>
                      <td className="py-4 px-4 font-mono text-slate-300">{pos.currentPrice.toFixed(2)}</td>
                      <td className={`py-4 px-4 font-mono font-bold text-right ${pos.profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {pos.profit >= 0 ? '+' : ''}{pos.profit.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {/* Bottom Section: History & News */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Recent Transactions */}
          <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Transaksi Terakhir</h3>
              <Link to="/dashboard/deposit" className="text-sm text-blue-400 hover:text-blue-300">Lihat Semua</Link>
            </div>
            <div className="space-y-4">
              {[
                { type: 'Deposit', method: 'QRIS', amount: 'Rp 5.000.000', status: 'Selesai', date: 'Hari ini, 10:45', icon: ArrowDownRight, color: 'emerald' },
                { type: 'Withdraw', method: 'Bank Transfer', amount: '$250.00', status: 'Diproses', date: 'Kemarin, 14:20', icon: ArrowUpRight, color: 'amber' },
                { type: 'Deposit', method: 'USDT', amount: '$500.00', status: 'Selesai', date: '12 Mar, 09:15', icon: ArrowDownRight, color: 'emerald' },
              ].map((tx, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${tx.color}-500/10 text-${tx.color}-400`}>
                      <tx.icon size={20} />
                    </div>
                    <div>
                      <div className="font-semibold">{tx.type}</div>
                      <div className="text-xs text-slate-400">{tx.method} • {tx.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold">{tx.amount}</div>
                    <div className={`text-xs ${tx.status === 'Selesai' ? 'text-emerald-400' : 'text-amber-400'}`}>{tx.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market News */}
          <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Berita Pasar Terkini</h3>
              <span className="text-xs px-2 py-1 rounded bg-white/5 text-slate-400">Live Updates</span>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Data NFP AS Melampaui Ekspektasi, Dolar Menguat', time: '10 menit yang lalu', tag: 'USD', impact: 'high' },
                { title: 'Harga Emas Terkoreksi Jelang Rapat The Fed', time: '1 jam yang lalu', tag: 'XAU', impact: 'medium' },
                { title: 'ECB Pertahankan Suku Bunga Utama di 4.5%', time: '3 jam yang lalu', tag: 'EUR', impact: 'high' },
                { title: 'Minyak Mentah Melonjak di Tengah Ketegangan Geopolitik', time: '5 jam yang lalu', tag: 'OIL', impact: 'medium' },
              ].map((news, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${news.impact === 'high' ? 'bg-red-500' : 'bg-amber-500'}`}></div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-200 group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug mb-1">{news.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="px-1.5 py-0.5 rounded bg-white/5 font-medium">{news.tag}</span>
                        <span>{news.time}</span>
                      </div>
                    </div>
                  </div>
                  {i < 3 && <div className="h-px w-full bg-white/5 my-3 ml-5"></div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
