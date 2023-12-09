export function AuthStatus({ user }: { user: any }) {
  return user ? (
    <div>
      Hey, {user.email}!
      {/* Logout-Logik hier */}
    </div>
  ) : (
    <a href="/login">Login</a>
  );
}