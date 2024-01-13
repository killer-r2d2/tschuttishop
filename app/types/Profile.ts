
export const enum Role {
  ADMIN = "admin",
  USER = "user",
}

export type Profile = {
  id: string;
  email: string;
  role: Role;     
  createdAt: Date;
  updatedAt: Date;
  firstname: string;
  lastname: string;  
  street: string; 
  city: string;   
  zip: string;
};

export type ProfileApiResponse = Profile | { error: string };
