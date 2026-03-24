import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '../../components/UI/Button';
import { Input } from '../../components/UI/Input';
import { User, Shield, Lock, Mail, KeyRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function SignIn() {
  const { user, register, signIn, pinCode } = useAuthStore();
  const navigate = useNavigate();

  // Determine initial mode based on whether an account exists offline
  const [mode, setMode] = useState(user ? (pinCode ? 'pin' : 'login') : 'register');

  // Register state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // PIN state
  const [pinInput, setPinInput] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    if (name && email && password) {
      register(name, email, password);
      navigate('/');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginEmail === user?.email && loginPassword === user?.password) {
      signIn();
      navigate('/');
    } else {
      setErrorMsg('Invalid email or password.');
    }
  };

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput === pinCode) {
      signIn();
      navigate('/');
    } else {
      setErrorMsg('Incorrect App Lock PIN.');
      setPinInput('');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      
      {/* LEFT SECTION - HERO SHOWCASE */}
      <div className="flex-1 flex flex-col justify-center px-10 py-16 md:px-16 lg:px-24 xl:px-32 border-b md:border-b-0 md:border-r border-gray-800/40 bg-[#080808]">
        <div className="max-w-xl w-full">
          {/* Logo / Shield Identifier */}
          <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center mb-8 md:mb-12 border border-gold/20 shadow-[0_0_30px_rgba(212,175,55,0.05)]">
            <Shield className="w-8 h-8 text-gold stroke-[1.5px]" />
          </div>
          
          {/* Hero Typography */}
          <h1 className="text-[40px] md:text-[56px] lg:text-[64px] font-bold text-gray-50 leading-[1.1] tracking-tight mb-8">
            {mode === 'register' ? (
              <>Own your <span className="text-gold">data.</span><br />Master your <span className="text-gold">spending.</span></>
            ) : (
              <>Welcome back to your financial <span className="text-gold">clarity.</span></>
            )}
          </h1>
          
          {/* Premium Tagline */}
          <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed tracking-wide max-w-lg">
            {mode === 'register' 
              ? "Calculate and get insights of your expenses at your fingertips. Your data never leaves this device."
              : "Re-enter your local vault securely and continue mastering your offline finances."}
          </p>
        </div>
      </div>

      {/* RIGHT SECTION - FORM PANEL */}
      <div className="w-full md:w-[480px] lg:w-[560px] flex flex-col justify-center px-8 py-16 md:px-16 bg-background">
        <div className="w-full max-w-sm mx-auto">
          
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-100 mb-2">
              {mode === 'register' ? 'Create Offline Vault' : mode === 'pin' ? 'Unlock Vault' : 'Sign In'}
            </h2>
            <p className="text-sm text-gray-500 font-medium">
              {mode === 'register' 
                ? 'Enter your details to generate your local account.' 
                : mode === 'pin' 
                  ? 'Enter your secure 4-digit App Lock PIN.' 
                  : 'Enter your registered credentials.'}
            </p>
          </div>

          {errorMsg && (
            <div className="w-full bg-red-900/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-lg mb-6 font-medium">
              {errorMsg}
            </div>
          )}

          {/* Form Groups */}
          {mode === 'register' && (
            <form onSubmit={handleRegister} className="w-full flex flex-col gap-5">
              <Input icon={User} placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
              <Input icon={Mail} type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Input icon={Lock} type="password" placeholder="Secure Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <Button type="submit" className="w-full mt-2 py-4 text-base shadow-[0_4px_20px_0_rgba(212,175,55,0.08)]">Create Local Account</Button>
            </form>
          )}

          {mode === 'login' && (
            <form onSubmit={handleLogin} className="w-full flex flex-col gap-5">
              <Input icon={Mail} type="email" placeholder="Email Address" value={loginEmail} onChange={(e) => { setLoginEmail(e.target.value); setErrorMsg(''); }} required />
              <Input icon={Lock} type="password" placeholder="Password" value={loginPassword} onChange={(e) => { setLoginPassword(e.target.value); setErrorMsg(''); }} required />
              <Button type="submit" className="w-full mt-2 py-4 text-base shadow-[0_4px_20px_0_rgba(212,175,55,0.08)]">Sign In</Button>
              {pinCode && (
                <Button type="button" variant="ghost" className="w-full text-sm mt-2 text-gray-400 hover:text-gray-200" onClick={() => { setMode('pin'); setErrorMsg(''); }}>
                  Use App Lock PIN instead
                </Button>
              )}
            </form>
          )}

          {mode === 'pin' && (
            <form onSubmit={handlePinSubmit} className="w-full flex flex-col gap-5">
              <Input 
                icon={KeyRound} 
                type="password"
                placeholder="0 0 0 0" 
                maxLength={4}
                value={pinInput}
                onChange={(e) => { setPinInput(e.target.value.replace(/\D/g, '')); setErrorMsg(''); }}
                required
                autoFocus
                className="text-center tracking-[1.5em] font-mono text-2xl h-14"
              />
              <Button type="submit" disabled={pinInput.length !== 4} className="w-full mt-2 py-4 text-base shadow-[0_4px_20px_0_rgba(212,175,55,0.08)]">
                Unlock
              </Button>
              <Button type="button" variant="ghost" className="w-full text-sm mt-2 text-gray-400 hover:text-gray-200" onClick={() => { setMode('login'); setErrorMsg(''); }}>
                Use Password instead
              </Button>
            </form>
          )}
          
          {/* Bottom Trust Indicator */}
          <div className="mt-12 flex items-center gap-2 text-xs text-gray-600 font-medium tracking-wide">
            <Shield className="w-4 h-4" />
            <span>100% Client-Side Encryption</span>
          </div>

        </div>
      </div>
    </div>
  );
}
