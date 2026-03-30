export interface IMember {
  id: string;
  dateOfBirth: string;
  imageUrl?: string;
  displayName: string;
  created: string;
  lastActive: string;
  gender: string;
  description?: string;
  city: string;
  country: string;
}

export interface IPhoto {
  id: number;
  url: string;
  publicId?: any;
  memberId: string;
}
