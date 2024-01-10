// profileService.ts
import prisma from "@/prisma/client";
import { Profile } from "@/app/types/Profile";

export type UpdateProfileType = Partial<Profile>;

export const updateProfile = async (id: string, profile: UpdateProfileType) => {
  return await prisma.profile.update({
    where: {
      id: id,
    },
    data: profile,
  });
};

export const getProfileById = async (id: string) => {
  return await prisma.profile.findUnique({
    where: {
      id: id,
    },
  });
}