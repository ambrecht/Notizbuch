'use client';
import { useSession, SupashipUserInfo } from '../supabase/useSession';

export default function UserList() {
  const userInfo = useSession();

  // Beispielhaftes Rendern der Nutzerliste
  const renderUserList = () => {
    if (userInfo.session && userInfo.profile) {
      return (
        <ul>
          <li>{userInfo.profile.username}</li>
        </ul>
      );
    } else {
      return <p>Noch keine Nutzer angemeldet</p>;
    }
  };

  return (
    <div>
      <h1>Angemeldete Nutzer</h1>
      {renderUserList()}
    </div>
  );
}
