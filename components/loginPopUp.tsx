import { useState } from 'react';

type LoginPopupProps = {
  onLogin: (email: string, password: string) => void;
};

export default function LoginPopup({ onLogin }: LoginPopupProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    onLogin(email, password);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <input
        type="email"
        placeholder="E-Mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 px-4 py-2 mb-4 rounded"
      />
      <input
        type="password"
        placeholder="Passwort"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-300 px-4 py-2 mb-4 rounded"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Anmelden
      </button>
    </div>
  );
}
