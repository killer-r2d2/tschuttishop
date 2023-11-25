'use client';
import { useState } from "react";
import supabase from "@/supabase/client";
import { Input } from "@nextui-org/react";
import { Section } from "../components/Base/Section";
import { Container } from "../components/Base/Container";

interface FormData {
  vorname: string;
  nachname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    vorname: "",
    nachname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState<string>("");

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    if (!formData.vorname.trim() || !formData.nachname.trim() || !formData.email.trim()) {
      setMessage("Bitte füllen Sie alle Felder aus");
      return false;
    }

    if (!validateEmail(formData.email)) {
      setMessage("Bitte geben Sie eine gültige E-Mail-Adresse ein");
      return false;
    }

    if (formData.password.length < 8) {
      setMessage("Das Passwort muss mindestens 8 Zeichen lang sein");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwörter stimmen nicht überein");
      return false;
    }

    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setMessage(`Fehler: ${error.message}`);
    } else {
      setMessage("Registrierung erfolgreich! Überprüfen Sie Ihre E-Mail.");
    }
  };

  return (
    <Section>
      <Container>
        <h1>register</h1>
        <form onSubmit={handleSubmit}>
        <div className="my-2">
        <Input
          type="text"
          variant="bordered"
          label="Vorname"
          name="vorname"
          onChange={handleInputChange}
        />
      </div>
      <div className="my-2">
        <Input
          type="text"
          variant="bordered"
          label="Nachname"
          name="nachname"
          onChange={handleInputChange}
        />
      </div>
      <div className="my-2">
        <Input
          type="text"
          variant="bordered"
          label="Email"
          name="email"
          onChange={handleInputChange}
        />
      </div>
      <div className="my-2">
        <Input
          type="password"
          variant="bordered"
          label="Passwort"
          name="password"
          onChange={handleInputChange}
        />
      </div>
      <div className="my-2">
        <Input
          type="password"
          variant="bordered"
          label="Passwort wiederholen"
          name="confirmPassword"
          onChange={handleInputChange}
        />
      </div>
      <div className="my-2">
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2"
        >
          Registrieren
        </button>
      </div>
        </form>
        {message && <p>{message}</p>}
      </Container>
    </Section>
  );
}
