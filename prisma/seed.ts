// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Ambil ID dari tabel yang terkait sebagai foreign key (contoh untuk `userId` dan `invitationId`)
  const user = await prisma.user.findFirst(); // Ambil user yang sudah ada
  const invitation = await prisma.invitation.findFirst(); // Ambil invitation yang sudah ada

  if (!user || !invitation) {
    console.log("Pastikan ada user dan invitation di database.");
    return;
  }

  // Seeder untuk Music
  await prisma.music.create({
    data: {
      musicUrl: "https://example.com/music.mp3",
    },
  });

  // Seeder untuk Comment
  await prisma.comment.create({
    data: {
      invitationId: invitation.id,
      name: "John Doe",
      text: "Selamat atas pernikahannya!",
    },
  });

  // Seeder untuk BrideGroom
  await prisma.brideGroom.create({
    data: {
      invitationId: invitation.id,
      nameGroom: "Budi",
      imageGroom: "https://example.com/imageGroom.jpg",
      parentGroom: "Orang Tua Budi",
      nameBride: "Ani",
      imageBride: "https://example.com/imageBride.jpg",
      parentBride: "Orang Tua Ani",
      linkInstagramGroom: "https://instagram.com/budi",
      linkFbGroom: "https://facebook.com/budi",
      linkTwitterGroom: "https://twitter.com/budi",
      linkYtbGroom: "https://youtube.com/budi",
      linkInstagramBride: "https://instagram.com/ani",
      linkFbBride: "https://facebook.com/ani",
      linkTwitterBride: "https://twitter.com/ani",
      linkYtbBride: "https://youtube.com/ani",
    },
  });

  // Seeder untuk Event
  await prisma.event.create({
    data: {
      invitationId: invitation.id,
      nameEvent: "Akad Nikah",
      location: "Gedung Serbaguna",
      address: "Jl. Contoh No. 1",
      dateEvent: new Date("2023-12-25T10:00:00Z"),
      startTime: new Date("2023-12-25T10:00:00Z"),
      endTime: new Date("2023-12-25T12:00:00Z"),
      linkNavigationMap: "https://maps.example.com/location",
    },
  });

  // Seeder untuk PaymentTransaction
  await prisma.paymentTransaction.create({
    data: {
      invitationId: invitation.id,
      paymentMethod: "cash",
      amount: 500000,
      paymentStatus: "completed",
      transactionDate: new Date(),
    },
  });

  // Seeder untuk Rsvp
  await prisma.rsvp.create({
    data: {
      invitationId: invitation.id,
      guestName: "Dina",
      numberOfPeople: 2,
      confirmationStatus: "confirmed",
    },
  });

  // Seeder untuk Invitation
  await prisma.invitation.create({
    data: {
      userId: user.id,
      designId: invitation.designId, // gunakan ID desain yang sudah ada
      qouteId: invitation.qouteId, // gunakan ID quote yang sudah ada
      musicId: invitation.musicId, // gunakan ID musik yang sudah ada
      link: "https://example.com/invitation",
    },
  });

  // Seeder untuk Quote
  await prisma.quote.create({
    data: {
      content: "Cinta adalah segalanya",
      author: "John Doe",
    },
  });

  // Seeder untuk Design
  await prisma.design.create({
    data: {
      name: "Elegant Design",
      price: 250000,
      imageUrl: "https://example.com/design.jpg",
      templateName: "template.ejs",
      category: "Elegant",
    },
  });

  // Seeder untuk Gift
  await prisma.gift.create({
    data: {
      invitationId: invitation.id,
      nameAccount: "Budi",
      noAccount: "1234567890",
      imgAccount: "https://example.com/account.jpg",
    },
  });

  // Seeder untuk LoveStory
  await prisma.loveStory.create({
    data: {
      invitationId: invitation.id,
      title: "Pertemuan Pertama",
      story: "Kami bertemu di suatu acara dan jatuh cinta.",
      imageUrl: "https://example.com/love.jpg",
    },
  });

  // Seeder untuk Setting
  await prisma.setting.create({
    data: {
      invitationId: invitation.id,
      title: "Pengaturan Undangan",
      textPembuka: "Selamat datang",
      textAcara: "Mari merayakan hari bahagia kami",
      textPenutup: "Terima kasih telah hadir",
      broadcast: "broadcast_link",
    },
  });

  // Seeder untuk Gallery
  await prisma.gallery.create({
    data: {
      invitationId: invitation.id,
      imageUrl: "https://example.com/gallery.jpg",
    },
  });

  // Seeder untuk Review
  await prisma.review.create({
    data: {
      designId: invitation.designId,
      rate: 5,
      comment: "Sangat berkesan!",
    },
  });

  console.log("Data seeder berhasil dibuat.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
