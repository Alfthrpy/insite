interface BrideGroomData {
    invitationId: string; // UUID valid
    nameGroom: string; // Nama pengantin pria
    imageGroom: string; // URL gambar pengantin pria
    parentGroom: string; // Nama orang tua pengantin pria
    nameBride: string; // Nama pengantin wanita
    imageBride: string; // URL gambar pengantin wanita
    parentBride: string; // Nama orang tua pengantin wanita
    linkInstagramGroom?: string; // Opsional, URL Instagram pengantin pria
    linkFbGroom?: string; // Opsional, URL Facebook pengantin pria
    linkTwitterGroom?: string; // Opsional, URL Twitter pengantin pria
    linkYtbGroom?: string; // Opsional, URL YouTube pengantin pria
    linkInstagramBride?: string; // Opsional, URL Instagram pengantin wanita
    linkFbBride?: string; // Opsional, URL Facebook pengantin wanita
    linkTwitterBride?: string; // Opsional, URL Twitter pengantin wanita
    linkYtbBride?: string; // Opsional, URL YouTube pengantin wanita
  }

  interface EventData {
    id: string;
    invitationId: string; // UUID valid
    nameEvent: string; // Nama acara
    location: string; // Lokasi acara
    address: string; // Alamat acara
    dateEvent: string; // Tanggal acara (format datetime ISO string)
    startTime: string; // Waktu mulai acara (format datetime ISO string)
    endTime: string; // Waktu selesai acara (format datetime ISO string)
    linkNavigationMap: string; // URL peta
  }

  interface GalleryData {
    id: string;
    invitationId: string; // UUID valid
    imageUrl: string; // URL gambar
  }

  interface GiftData {
    id : string
    invitationId: string; // UUID valid
    nameUserAccount: string; 
    nameAccount: string; // Nama akun (tidak boleh kosong)
    noAccount: string; // Nomor akun (tidak boleh kosong)
    imgAccount?: string; // URL gambar akun (opsional)
  }
  
  interface LoveStoryData {
    id : string;
    invitationId: string; // UUID valid
    title: string; // Judul cerita cinta (tidak boleh kosong)
    story: string; // Cerita cinta (tidak boleh kosong)
    imageUrl: string; // URL gambar (opsional)
  }

  interface DesignData {
    id:string;
    name: string;
    price: number;
    imageUrl: string;
    templateName: string;
    category: string;
  }

  interface InvitationData {
    id: string; // ID unik menggunakan UUID
    name : string;
    userId: string; // ID pengguna terkait
    designId: string; // ID desain unik
    qouteId?: string; // ID kutipan opsional
    musicId?: string; // ID musik opsional
    Quote: QuoteData; 
    Music: MusicData; //
    Design: DesignData;
    link: string; // URL/link undangan
    createdAt: Date; // Tanggal dan waktu pembuatan
    updatedAt: Date; // Tanggal dan waktu pembaruan terakhir
    deletedAt?: Date; // Tanggal dan waktu penghapusan opsional
  }

interface QuoteData {
    id: string; // ID unik untuk kutipan (UUID)
    content: string; // Konten kutipan
    author: string; // Penulis atau sumber kutipan
    createdAt: Date; // Tanggal dan waktu pembuatan
    updatedAt: Date; // Tanggal dan waktu pembaruan terakhir
    deletedAt?: Date | null; // Tanggal dan waktu penghapusan (opsional, bisa null jika belum dihapus)
  }
  
  
  interface MusicData {
    id: string;
    musicUrl: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  }

  interface RsvpData {
    id? : string;
    invitationId : string;
    guestName : string;
    numberOfPeople : number;
    confirmationStatus : string;
    customLink : string;
  }

  interface UserData {
    id : string;
    name: string;
    email: string;
    password: string;
    role?: string;
  }
  


export type {BrideGroomData,EventData,GalleryData,GiftData,LoveStoryData,InvitationData,QuoteData,MusicData,RsvpData,DesignData,UserData}