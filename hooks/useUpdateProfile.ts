import { mutate } from "swr";
import { Profile } from "../app/types/Profile";

export const useUpdateProfile = () => {
  const updateProfile = async (profileId: string, updateFields: Partial<Profile>) => {
    const response = await fetch(`/api/profile`, {
      method: "PUT",
      body: JSON.stringify({ profileId, ...updateFields }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("An error occurred while updating the profile.");
    }

    mutate(`/api/profile`);
  };

  return {
    updateProfile,
  };
};
