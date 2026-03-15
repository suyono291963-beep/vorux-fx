import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, TrendingUp, Globe, ArrowRight, Zap, Lock, BarChart3, Smartphone, ChevronRight, Star, PlayCircle, CheckCircle2, ArrowDownRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0B0E14] text-slate-50 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Navbar */}
      <nav className="border-b border-white/5 bg-[#0B0E14]/80 backdrop-blur-xl fixed top-0 w-full z-50">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center font-bold text-2xl tracking-tighter shadow-lg shadow-blue-500/20">
              V
            </div>
            <span className="text-2xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Vorux FX</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#markets" className="hover:text-white transition-colors">Markets</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#platform" className="hover:text-white transition-colors">Platform</a>
            <a href="#company" className="hover:text-white transition-colors">Company</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors hidden sm:block">
              Log In
            </Link>
            <Link to="/register" className="text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-full transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]">
              Open Account
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative pt-20">
        {/* Ticker Tape */}
        <div className="w-full border-b border-white/5 bg-[#0B0E14] overflow-hidden flex whitespace-nowrap py-3 relative z-40">
          <div className="animate-marquee flex gap-12 items-center text-sm font-mono w-max">
            {[
              { pair: 'EURUSD', price: '1.0942', change: '+0.12%', up: true },
              { pair: 'GBPUSD', price: '1.2651', change: '-0.05%', up: false },
              { pair: 'USDJPY', price: '149.32', change: '+0.45%', up: true },
              { pair: 'XAUUSD', price: '2345.60', change: '+0.53%', up: true },
              { pair: 'BTCUSD', price: '64230.00', change: '+2.10%', up: true },
              { pair: 'ETHUSD', price: '3450.20', change: '-0.80%', up: false },
              { pair: 'AUDUSD', price: '0.6540', change: '+0.15%', up: true },
              { pair: 'USDCAD', price: '1.3520', change: '-0.22%', up: false },
              // Duplicated for seamless loop
              { pair: 'EURUSD', price: '1.0942', change: '+0.12%', up: true },
              { pair: 'GBPUSD', price: '1.2651', change: '-0.05%', up: false },
              { pair: 'USDJPY', price: '149.32', change: '+0.45%', up: true },
              { pair: 'XAUUSD', price: '2345.60', change: '+0.53%', up: true },
              { pair: 'BTCUSD', price: '64230.00', change: '+2.10%', up: true },
              { pair: 'ETHUSD', price: '3450.20', change: '-0.80%', up: false },
              { pair: 'AUDUSD', price: '0.6540', change: '+0.15%', up: true },
              { pair: 'USDCAD', price: '1.3520', change: '-0.22%', up: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-slate-400 font-sans font-medium">{item.pair}</span>
                <span className="text-white">{item.price}</span>
                <span className={item.up ? 'text-emerald-400' : 'text-red-400'}>{item.change}</span>
                <span className="text-slate-700 mx-4">•</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center">
          {/* Background Elements */}
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] mix-blend-overlay"></div>

          <div className="max-w-[1400px] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 py-20">
            <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                Broker Global Terpercaya 2026
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 leading-[1.05]"
              >
                Trade the <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500">Future</span> Today.
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg sm:text-xl text-slate-400 mb-10 leading-relaxed max-w-xl"
              >
                Platform trading revolusioner dengan eksekusi 0.01ms, spread mulai dari 0.0 pips, dan likuiditas institusional. Bergabunglah dengan elite trader di Vorux FX.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-4"
              >
                <Link to="/register" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-medium transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] hover:-translate-y-1">
                  Mulai Trading Sekarang
                  <ArrowRight size={18} />
                </Link>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-12 flex items-center gap-6 text-sm text-slate-400"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400" /> Regulasi Penuh
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400" /> Dana Terpisah
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400" /> Support 24/7
                </div>
              </motion.div>
            </div>

            {/* Hero Visual / Mockup */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
              className="relative hidden lg:block perspective-1000"
            >
              <div className="relative z-10 rounded-2xl border border-white/10 bg-[#0B0E14]/80 backdrop-blur-xl shadow-2xl shadow-blue-500/20 overflow-hidden transform rotate-y-[-5deg] rotate-x-[5deg]">
                <div className="h-8 border-b border-white/10 bg-white/5 flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <div className="text-slate-400 text-sm mb-1">XAUUSD • Gold</div>
                      <div className="text-3xl font-mono font-bold text-white">2,345.60</div>
                    </div>
                    <div className="text-emerald-400 font-mono text-lg flex items-center gap-1">
                      <TrendingUp size={20} /> +12.40 (+0.53%)
                    </div>
                  </div>
                  {/* Mock Chart Lines */}
                  <div className="h-48 flex items-end gap-2">
                    {[40, 30, 50, 45, 60, 55, 70, 65, 80, 75, 90, 85, 100].map((h, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-blue-600/20 to-blue-400 rounded-t-sm" style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -right-12 top-20 p-4 rounded-xl border border-white/10 bg-[#0B0E14]/90 backdrop-blur-xl shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="text-xs text-slate-400 mb-1">EURUSD</div>
                <div className="font-mono font-bold text-emerald-400">1.0942 ▲</div>
              </div>
              <div className="absolute -left-8 bottom-20 p-4 rounded-xl border border-white/10 bg-[#0B0E14]/90 backdrop-blur-xl shadow-xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                <div className="text-xs text-slate-400 mb-1">Profit Hari Ini</div>
                <div className="font-mono font-bold text-blue-400 text-xl">+$4,250.00</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
              <div className="text-center px-4">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono">$50B+</div>
                <div className="text-sm text-slate-400 uppercase tracking-wider">Volume Trading Bulanan</div>
              </div>
              <div className="text-center px-4">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono">&lt;10ms</div>
                <div className="text-sm text-slate-400 uppercase tracking-wider">Kecepatan Eksekusi</div>
              </div>
              <div className="text-center px-4">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono">0.0</div>
                <div className="text-sm text-slate-400 uppercase tracking-wider">Spread Mulai Dari (Pips)</div>
              </div>
              <div className="text-center px-4">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono">150+</div>
                <div className="text-sm text-slate-400 uppercase tracking-wider">Instrumen Trading</div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Instruments Section */}
        <section id="markets" className="py-24 border-b border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-[1400px] mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Pasar Global di Ujung Jari Anda</h2>
                <p className="text-lg text-slate-400">Akses lebih dari 150+ instrumen trading termasuk Forex, Komoditas, Indeks, dan Kripto dengan spread sangat rendah.</p>
              </div>
              <Link to="/register" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors group">
                Lihat Semua Instrumen <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'EUR/USD', type: 'Forex', price: '1.09425', change: '+0.12%', up: true, chart: [30, 40, 35, 50, 45, 60, 55, 70] },
                { name: 'XAU/USD', type: 'Commodity', price: '2,345.60', change: '+0.53%', up: true, chart: [50, 45, 60, 55, 70, 65, 80, 85] },
                { name: 'BTC/USD', type: 'Crypto', price: '64,230.00', change: '-1.20%', up: false, chart: [80, 75, 85, 70, 60, 65, 50, 45] },
                { name: 'US30', type: 'Index', price: '39,150.20', change: '+0.85%', up: true, chart: [40, 45, 42, 55, 60, 58, 75, 80] },
              ].map((instrument, i) => (
                <div key={i} className="bg-slate-900/40 border border-white/5 hover:border-blue-500/30 rounded-2xl p-6 transition-all group hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(37,99,235,0.1)]">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{instrument.name}</h3>
                      <span className="text-xs font-medium px-2 py-1 rounded-md bg-white/5 text-slate-400">{instrument.type}</span>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${instrument.up ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                      {instrument.up ? <TrendingUp size={16} /> : <ArrowDownRight size={16} />}
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="text-2xl font-mono font-bold text-white mb-1">{instrument.price}</div>
                    <div className={`text-sm font-medium ${instrument.up ? 'text-emerald-400' : 'text-red-400'}`}>
                      {instrument.change} Hari Ini
                    </div>
                  </div>
                  {/* Mini Chart */}
                  <div className="h-12 flex items-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    {instrument.chart.map((h, j) => (
                      <div key={j} className={`flex-1 rounded-t-sm ${instrument.up ? 'bg-emerald-500/40' : 'bg-red-500/40'}`} style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section id="features" className="py-32 relative">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Keunggulan Trading di Vorux FX</h2>
              <p className="text-lg text-slate-400">Kami menyediakan infrastruktur kelas institusi untuk trader retail. Nikmati pengalaman trading tanpa hambatan dengan teknologi terdepan.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Large Feature */}
              <div className="md:col-span-2 p-10 rounded-3xl bg-gradient-to-br from-slate-900 to-[#0B0E14] border border-white/5 hover:border-blue-500/30 transition-all group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20 transition-transform group-hover:scale-110"></div>
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-8 relative z-10">
                  <Zap size={28} />
                </div>
                <h3 className="text-3xl font-semibold mb-4 relative z-10">Eksekusi Ultra Cepat</h3>
                <p className="text-slate-400 text-lg leading-relaxed max-w-md relative z-10">Server kami berlokasi di Equinix NY4, LD4, dan TY3, memastikan latensi terendah dan eksekusi order tanpa requote.</p>
              </div>

              {/* Small Feature 1 */}
              <div className="p-10 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-purple-500/30 transition-all group relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl -mr-10 -mb-10 transition-transform group-hover:scale-110"></div>
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6 relative z-10">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3 relative z-10">Keamanan Dana</h3>
                <p className="text-slate-400 leading-relaxed relative z-10">Dana klien disimpan di bank tier-1 secara terpisah (segregated) dan diasuransikan.</p>
              </div>

              {/* Small Feature 2 */}
              <div className="p-10 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-emerald-500/30 transition-all group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl -ml-10 -mt-10 transition-transform group-hover:scale-110"></div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 relative z-10">
                  <BarChart3 size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3 relative z-10">Analisis Mendalam</h3>
                <p className="text-slate-400 leading-relaxed relative z-10">Akses ke tools charting premium, kalender ekonomi, dan sinyal trading harian.</p>
              </div>

              {/* Large Feature 2 */}
              <div className="md:col-span-2 p-10 rounded-3xl bg-gradient-to-bl from-slate-900 to-[#0B0E14] border border-white/5 hover:border-blue-500/30 transition-all group overflow-hidden relative">
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-20 -mb-20 transition-transform group-hover:scale-110"></div>
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-8 relative z-10">
                  <Smartphone size={28} />
                </div>
                <h3 className="text-3xl font-semibold mb-4 relative z-10">Trading di Mana Saja</h3>
                <p className="text-slate-400 text-lg leading-relaxed max-w-md relative z-10">Aplikasi mobile mutakhir kami memungkinkan Anda memantau pasar, membuka posisi, dan mengelola portofolio langsung dari genggaman Anda.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 border-t border-white/5 bg-[#0B0E14] relative">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Dipercaya oleh Trader Profesional</h2>
              <p className="text-lg text-slate-400">Bergabung dengan ribuan trader yang telah memilih Vorux FX sebagai mitra trading andalan mereka.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Budi Santoso', role: 'Day Trader', text: 'Eksekusi di Vorux FX luar biasa cepat. Tidak ada slippage yang berarti bahkan saat berita NFP rilis. Platform yang sangat solid.', rating: 5 },
                { name: 'Sarah Wijaya', role: 'Swing Trader', text: 'Spread XAUUSD sangat tipis dibandingkan broker lain yang pernah saya coba. Proses penarikan dana via QRIS juga instan.', rating: 5 },
                { name: 'Michael Chen', role: 'Algorithmic Trader', text: 'API trading yang disediakan sangat stabil. Dukungan pelanggan 24/7 sangat membantu saat saya mengalami kendala teknis.', rating: 5 },
              ].map((testimonial, i) => (
                <div key={i} className="bg-slate-900/30 border border-white/5 rounded-3xl p-8 relative">
                  <div className="flex gap-1 text-amber-400 mb-6">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <Star key={j} size={18} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-lg leading-relaxed mb-8 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-slate-500">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-600/5"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 tracking-tight">Siap Untuk Memulai?</h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">Buka akun live dalam waktu kurang dari 3 menit. Deposit instan via QRIS dan mulai trading di pasar global hari ini.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-full text-lg font-medium transition-all shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:-translate-y-1">
                Buka Akun Live
              </Link>
              <Link to="/login" className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white px-10 py-5 rounded-full text-lg font-medium transition-all hover:-translate-y-1">
                Login ke Dashboard
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#05070A] border-t border-white/5 pt-20 pb-10">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-xl tracking-tighter">
                  V
                </div>
                <span className="text-xl font-semibold tracking-tight">Vorux FX</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-sm mb-6">
                Vorux FX adalah broker multi-aset global yang menawarkan platform trading canggih, likuiditas mendalam, dan eksekusi secepat kilat untuk trader di seluruh dunia.
              </p>
              <div className="flex items-center gap-4">
                {/* Social placeholders */}
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">X</div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">in</div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">ig</div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-6">Instrumen</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Forex</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Komoditas</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Indeks Saham</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Kripto</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-6">Platform</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-blue-400 transition-colors">MetaTrader 5</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Vorux WebTrader</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Mobile App</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">API Trading</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-6">Perusahaan</h4>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Tentang Kami</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Hubungi Kami</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Karir</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Pusat Bantuan</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
            <p>© 2026 Vorux FX. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-slate-400 transition-colors">Risk Disclosure</a>
            </div>
          </div>
          <div className="mt-8 text-[10px] text-slate-700 leading-relaxed text-justify">
            <strong className="text-slate-600">Peringatan Risiko:</strong> Trading valuta asing (Forex) dan Contract for Differences (CFD) menggunakan margin membawa tingkat risiko tinggi dan mungkin tidak cocok untuk semua investor. Tingkat leverage yang tinggi dapat bekerja melawan Anda maupun untuk Anda. Sebelum memutuskan untuk trading Forex atau CFD, Anda harus mempertimbangkan dengan cermat tujuan investasi, tingkat pengalaman, dan selera risiko Anda. Ada kemungkinan Anda dapat mengalami kerugian sebagian atau seluruh investasi awal Anda dan oleh karena itu Anda tidak boleh menginvestasikan uang yang Anda tidak mampu kehilangannya.
          </div>
        </div>
      </footer>
    </div>
  );
}
