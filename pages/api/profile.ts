import { NextApiRequest, NextApiResponse } from "next";
import { updateProfile, getProfileById } from "@/services/profileService";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      const { profileId, ...updateData } = req.body;

      if (!profileId) {
        return res.status(400).json({ error: "Profile ID is required" });
      }

      const updatedProfile = await updateProfile(profileId, updateData);
      return res.status(200).json(updatedProfile);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while updating the profile." });
    }
  }

  else if (req.method === "GET") {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: "Profile ID is required" });
      }

      const profile = await getProfileById(id as string);
      return res.status(200).json(profile);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while getting the profile." });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
