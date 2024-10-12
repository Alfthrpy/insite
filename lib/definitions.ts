import { z } from "zod";

// Validation schema for Music
const MusicSchema = z.object({
  id: z.string().uuid(),
  invitationId: z.string().uuid(),
  musicUrl: z.string().url(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});

// Validation schema for Comment
const CommentSchema = z.object({
  id: z.string().uuid(),
  invitationId: z.string().uuid(),
  text: z.string().min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.bigint(),
});

// Validation schema for BrideGroom
const BrideGroomSchema = z.object({
  id: z.string().uuid(),
  invitationId: z.string().uuid(),
  nameGroom: z.string().min(1),
  imageGroom: z.string().url(),
  parentGroom: z.string().min(1),
  linkInstagramGroom: z.string().url().optional(),
  linkFbGroom: z.string().url().optional(),
  linkTwitterGroom: z.string().url().optional(),
  linkYtbGroom: z.string().url().optional(),
  nameBride: z.string().min(1),
  imageBride: z.string().url(),
  parentBride: z.string().min(1),
  linkInstagramBride: z.string().url().optional(),
  linkFbBride: z.string().url().optional(),
  linkTwitterBride: z.string().url().optional(),
  linkYtbBride: z.string().url().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date(),
});

// Validation schema for Event
const EventSchema = z.object({
  id: z.string().uuid(),
  invitationId: z.string().uuid(),
  nameEvent: z.string().min(1),
  location: z.string().min(1),
  address: z.string().min(1),
  dateEvent: z.date(),
  startTime: z.date(),
  endTime: z.date(),
  linkNavigationMap: z.string().url(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date(),
});

// Validation schema for PaymentTransaction
const PaymentTransactionSchema = z.object({
  id: z.string().uuid(),
  invitationId: z.string().uuid(),
  paymentMethod: z.enum(["cash", "credit_card", "transfer"]).default("cash"),
  amount: z.number().positive(),
  paymentStatus: z.enum(["pending", "completed", "failed"]).default("pending"),
  transactionDate: z.date(),
});

// Validation schema for Rsvp
const RsvpSchema = z.object({
  id: z.string().uuid(),
  invitationId: z.string().uuid(),
  guestName: z.string().min(1),
  numberOfPeople: z.bigint().nonnegative(),
  confirmationStatus: z.enum(["pending", "confirmed", "declined"]).default("pending"),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date(),
});

// Validation schema for Invitation
const InvitationSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  designId: z.string().uuid(),
  link: z.string().url(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date(),
});

// Validation schema for Quote
const QuoteSchema = z.object({
  id: z.string().uuid(),
  invitationId: z.string().uuid(),
  content: z.string().min(1),
  author: z.string().min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date(),
});

// Validation schema for Design
const DesignSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  price: z.number().positive(),
  imageUrl: z.string().url(),
  templateFile: z.string().min(1),
  category: z.string().min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date(),
});

// Validation schema for Gift
const GiftSchema = z.object({
  id: z.string().uuid(),
  invitationId: z.string().uuid(),
  nameAccount: z.string().min(1),
  noAccount: z.string().min(1),
  imgAccount: z.string().url().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date(),
});

// Validation schema for LoveStory
const LoveStorySchema = z.object({
  id: z.string().uuid(),
  invitationId: z.string().uuid(),
  title: z.string().min(1),
  story: z.string().min(1),
  imageUrl: z.string().url().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date(),
});

// Validation schema for Setting
const SettingSchema = z.object({
  id: z.string().uuid(),
  invitationId: z.string().uuid(),
  title: z.string().min(1),
  textPembuka: z.string().min(1),
  textAcara: z.string().min(1),
  textPenutup: z.string().min(1),
  broadcast: z.string().min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date(),
});

// Validation schema for Gallery
const GallerySchema = z.object({
  invitationId: z.string().uuid(),
  imageUrl: z.string().url(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date(),
});

// Validation schema for User
const UserSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.string().min(1).optional(),
});

const LoginFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Email tidak valid" })
    .min(1, { message: "Email wajib diisi" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }),
});

const RegisterFormSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Username minimal 2 karakter" })
      .max(50, { message: "Username maksimal 50 karakter" }),
    email: z
      .string()
      .email({ message: "Email tidak valid" })
      .min(1, { message: "Email wajib diisi" }),
    password: z.string().min(6, { message: "Password minimal 6 karakter" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password minimal 6 karakter" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords tidak sama",
    path: ["confirmPassword"],
  });

const UpdateUserSchema = z.object({
  username: z
    .string()
    .min(3, "Username must contain at least 3 character(s)")
    .optional(),
  email: z.string().email("Invalid email address").optional(),
});

// Validation schema for Review
const ReviewSchema = z.object({
  id: z.string().uuid(),
  invitationId: z.string().uuid(),
  rate: z.bigint().nonnegative(),
  comment: z.string().min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date(),
});

export {
  MusicSchema,
  CommentSchema,
  BrideGroomSchema,
  EventSchema,
  PaymentTransactionSchema,
  RsvpSchema,
  InvitationSchema,
  QuoteSchema,
  DesignSchema,
  GiftSchema,
  LoveStorySchema,
  SettingSchema,
  GallerySchema,
  UserSchema,
  ReviewSchema,
  UpdateUserSchema,
  LoginFormSchema,
  RegisterFormSchema,
};
