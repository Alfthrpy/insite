import { z } from "zod";

const MusicSchema = z.object({
  musicUrl: z.string().url({ message: "URL musik tidak valid" }),
});

// Validation schema for Comment
const CommentSchema = z.object({
  invitationId: z.string().uuid({ message: "Invitation ID harus berupa UUID yang valid" }),
  name : z.string().min(1, {message:"Nama tidak boleh kosong"}),
  text: z.string().min(1, { message: "Komentar tidak boleh kosong" }),
});

// Validation schema for BrideGroom
const BrideGroomSchema = z.object({
  invitationId: z.string().uuid({ message: "Invitation ID harus berupa UUID yang valid" }),
  nameGroom: z.string().min(1, { message: "Nama pengantin pria tidak boleh kosong" }),
  imageGroom: z.string().url({ message: "URL gambar pengantin pria tidak valid" }),
  parentGroom: z.string().min(1, { message: "Nama orang tua pengantin pria tidak boleh kosong" }),
  nameBride: z.string().min(1, { message: "Nama pengantin wanita tidak boleh kosong" }),
  imageBride: z.string().url({ message: "URL gambar pengantin wanita tidak valid" }),
  parentBride: z.string().min(1, { message: "Nama orang tua pengantin wanita tidak boleh kosong" }),
  linkInstagramGroom: z.string().url().optional(),
  linkFbGroom: z.string().url().optional(),
  linkTwitterGroom: z.string().url().optional(),
  linkYtbGroom: z.string().url().optional(),
  linkInstagramBride: z.string().url().optional(),
  linkFbBride: z.string().url().optional(),
  linkTwitterBride: z.string().url().optional(),
  linkYtbBride: z.string().url().optional(),
});

// Validation schema for Event
const EventSchema = z.object({
  invitationId: z.string().uuid({ message: "Invitation ID harus berupa UUID yang valid" }),
  nameEvent: z.string().min(1, { message: "Nama acara tidak boleh kosong" }),
  location: z.string().min(1, { message: "Lokasi acara tidak boleh kosong" }),
  address: z.string().min(1, { message: "Alamat acara tidak boleh kosong" }),
  dateEvent: z.string().datetime({ message: "Tanggal acara tidak valid" }),
  startTime: z.string().datetime({ message: "Waktu mulai acara tidak valid" }),
  endTime: z.string().datetime({ message: "Waktu selesai acara tidak valid" }),
  linkNavigationMap: z.string().url({ message: "URL peta tidak valid" }),
});


// Validation schema for PaymentTransaction
const PaymentTransactionSchema = z.object({
  invitationId: z.string().uuid({ message: "Invitation ID harus berupa UUID yang valid" }),
  paymentMethod: z.enum(["cash", "credit_card", "transfer"], {
    message: "Metode pembayaran harus salah satu dari: cash, credit_card, transfer"
  }).default("cash"),
  amount: z.number().positive({ message: "Jumlah pembayaran harus lebih besar dari 0" }),
  paymentStatus: z.enum(["pending", "completed", "failed"], {
    message: "Status pembayaran harus salah satu dari: pending, completed, failed"
  }).default("pending"),
  transactionDate: z.string().datetime({ message: "Tanggal transaksi tidak valid" }),
});

// Validation schema for Rsvp
const RsvpSchema = z.object({
  invitationId: z.string().uuid({ message: "Invitation ID harus berupa UUID yang valid" }),
  guestName: z.string().min(1, { message: "Nama tamu tidak boleh kosong" }),
  numberOfPeople: z.number().nonnegative({ message: "Jumlah orang tidak boleh negatif" }),
  confirmationStatus: z.enum(["pending", "confirmed", "declined"], {
    message: "Status konfirmasi harus salah satu dari: pending, confirmed, declined"
  }).default("pending"),
});

// Validation schema for Invitation
const InvitationSchema = z.object({
  userId: z.string().uuid({ message: "User ID harus berupa UUID yang valid" }),
  designId: z.string().uuid(),
  qouteId: z.string().uuid().optional(),
  musicId: z.string().uuid().optional(),
  link: z.string().url({ message: "URL undangan tidak valid" }),
});

// Validation schema for Quote
const QuoteSchema = z.object({
  content: z.string().min(1, { message: "Konten kutipan tidak boleh kosong" }),
  author: z.string().min(1, { message: "Nama penulis kutipan tidak boleh kosong" }),
});

// Validation schema for Design
const DesignSchema = z.object({
  name: z.string().min(1, { message: "Nama desain tidak boleh kosong" }),
  price: z.number().positive({ message: "Harga desain harus lebih besar dari 0" }),
  imageUrl: z.string().url({ message: "URL gambar desain tidak valid" }),
  templateName: z.string().min(1, { message: "File template desain tidak boleh kosong" }),
  category: z.string().min(1, { message: "Kategori desain tidak boleh kosong" }),
});

// Validation schema for Gift
const GiftSchema = z.object({
  nameAccount: z.string().min(1, { message: "nama provider tidak boleh kosong" }),
  nameUserAccount: z.string().min(1, { message: "Nama akun tidak boleh kosong" }),
  noAccount: z.string().min(1, { message: "Nomor akun tidak boleh kosong" }),
  imgAccount: z.string().url().optional(),
});

// Validation schema for LoveStory
const LoveStorySchema = z.object({
  invitationId: z.string().uuid({ message: "Invitation ID harus berupa UUID yang valid" }),
  title: z.string().min(1, { message: "Judul cerita cinta tidak boleh kosong" }),
  story: z.string().min(1, { message: "Cerita cinta tidak boleh kosong" }),
  imageUrl: z.string().url().optional(),
});

// Validation schema for Setting
const SettingSchema = z.object({
  invitationId: z.string().uuid({ message: "Invitation ID harus berupa UUID yang valid" }),
  title: z.string().min(1, { message: "Judul pengaturan tidak boleh kosong" }),
  textPembuka: z.string().min(1, { message: "Teks pembuka tidak boleh kosong" }),
  textAcara: z.string().min(1, { message: "Teks acara tidak boleh kosong" }),
  textPenutup: z.string().min(1, { message: "Teks penutup tidak boleh kosong" }),
  broadcast: z.string().min(1, { message: "Broadcast tidak boleh kosong" }),
});

// Validation schema for Gallery
const GallerySchema = z.object({
  invitationId: z.string().uuid({ message: "Invitation ID harus berupa UUID yang valid" }),
  imageUrl: z.string().url({ message: "URL gambar tidak valid" }),
});

const ReviewSchema = z.object({
  designId: z.string().uuid({ message: "Invitation ID harus berupa UUID yang valid" }),
  rate: z.number().nonnegative({ message: "Rating tidak boleh negatif" }),
  comment: z.string().min(1, { message: "Komentar tidak boleh kosong" }),
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
