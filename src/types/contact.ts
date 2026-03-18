export type ContactMessage = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export type CreateContactMessagePayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
};
