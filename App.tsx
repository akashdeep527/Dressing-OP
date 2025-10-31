import React, { useState } from 'react';
import { HomePage } from './components/HomePage';
import { EditorPage } from './components/EditorPage';
import type { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleSignIn = () => {
    // This is a mock sign-in. In a real application, this would trigger
    // an OAuth flow with Google.
    setUser({
      name: 'Alex Doe',
      avatarUrl: `https://i.pravatar.cc/150?u=alexdoe`,
    });
  };

  const handleSignOut = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 font-sans text-gray-200">
      {user ? (
        <EditorPage user={user} onSignOut={handleSignOut} />
      ) : (
        <HomePage onSignIn={handleSignIn} />
      )}
    </div>
  );
};

export default App;