"use client";
import { useState } from "react";
import supabase from "@/supabase/client";

export default function PasswordUpdate() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [message, setMessage] = useState("");

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setMessage("Passwörter stimmen nicht überein.");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Passwort erfolgreich aktualisiert.");
    }
  };

  return (
    <div>
      <form onSubmit={handlePasswordUpdate}>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Neues Passwort"
        />
        <input
          type="password"
          name="passwordConfirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          placeholder="Passwort bestätigen"
        />
        <button type="submit">Passwort aktualisieren</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

