"use client";
import { userState } from "@/store/userState";
import React from "react";

interface AuthStateProps {
  condition: boolean;
}
export default function AuthState(props: AuthStateProps) {
  const { isLoggedIn, setIsLoggedIn } = userState();

  const { condition } = props;

  // Conditionally set the boolean to true based on the prop
  React.useEffect(() => {
    if (condition) {
      setIsLoggedIn();
    }
  }, [condition, setIsLoggedIn]);

  return (
    <div>
      <p>isLoggidn: {isLoggedIn.toString()}</p>
      {/* ... */}
    </div>
  );
}
