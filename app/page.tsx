'use client'
import { useState } from "react";
import Image from "next/image";
import "./styles/style.css";

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleNavigation = (sectionId : any) => {
    setActiveSection(sectionId);

    // Scroll ke bagian yang sesuai
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleWhatsAppClick = (data : any) => {
    // Nomor WhatsApp tujuan (format internasional tanpa tanda "+")
    const phoneNumber = '6289658504225'; 
    // Pesan bawaan
    const message = encodeURIComponent(`Halo, saya ingin membuat undangan digital dengan template berikut : ${data}`);

    // URL WhatsApp dengan nomor dan pesan
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

    // Arahkan ke URL
    window.open(whatsappURL, '_blank'); // Membuka di tab baru
  };
  return (
    <section>
      <div className="container">
      <div className="navbar">
        <div className="logo">
          <Image src={"/img/logo.png"} alt="Logo" width={100} height={100}/>
        </div>
        <div className="menu">
          <a
            href="#home"
            className={`home ${activeSection === 'home' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('home');
            }}
          >
            HOME
          </a>
          <a
            href="#template"
            className={activeSection === 'template' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('template');
            }}
          >
            TEMPLATE
          </a>
          <a
            href="#fitur"
            className={activeSection === 'fitur' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('fitur');
            }}
          >
            FITUR
          </a>
          <a
            href="#kontak"
            className={activeSection === 'kontak' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation('kontak');
            }}
          >
            KONTAK
          </a>
        </div>
        <a href="/login"></a>
      </div>

        <div className="hero-section" id="home">
          <img src="/img/polygon2.png" alt="" className="background-image" />
          <div className="hero-content">
            <h1>
              Buat Undangan Digital
              <br /> Dalam Bentuk
              <br /> <span>Website</span>
            </h1>
            <p>Pilih tema sesuai keinginan</p>
            <div className="hero-buttons">
              <a href="#" className="button-create">
                Buat Sekarang
              </a>
              <a href="#" className="button-demo">
                Lihat Demo
              </a>
            </div>
          </div>
          <div className="hero-image">
            {/* <img src="/img/hero-imagealt.png" alt="Undangan Digital" /> */}
            <Image src="/img/hero-imagealt.png" alt="Undangan Digital" width={500} height={500} />
          </div>
        </div>
      </div>

      <div className="products" id="template">
        <h2>
          Template <span>Undangan</span>
        </h2>
        <div className="all-products">
          <div className="product">
            {/* <img src="img/template/prewed1.png" alt="Template 1" /> */}
            <Image src="/img/template/prewed1.png" alt="Template 1" width={200} height={200} />
            <div className="product-info">
              <a className="product-btn" href="" onClick={()=>handleWhatsAppClick("Template 1")}>
                Buat 
              </a>
              <a className="button-demo" href="template">
                Lihat Demo
              </a>
            </div>
          </div>
          <div className="product">
            {/* <img src="img/template/tmp2.png" alt="template 2" /> */}
            <Image src="/img/template/tmp2.png" alt="template 2" width={200} height={200} />
            <div className="product-info">
              <a className="product-btn" href="" onClick={()=>handleWhatsAppClick("Template 2")}>
                Buat 
              </a>
              <a className="button-demo" href="#">
                Lihat Demo
              </a>
            </div>
          </div>
          <div className="product">
            {/* <img src="img/template/tmp3.png" alt="template 3" /> */}
            <Image src="/img/template/tmp3.png" alt="template 3" width={200} height={200} />
            <div className="product-info">
              <a className="product-btn" href="" onClick={()=>handleWhatsAppClick("Template 3")}>
                Buat 
              </a>
              <a className="button-demo" href="template/template3">
                Lihat Demo
              </a>
            </div>
          </div>
          {/* <div className="product">
            <img src="ipad-pro.jpg" alt="iPad Pro" />
            <div className="product-info">
              <a className="product-btn" href="#">Buat </a>
              <a className="button-demo" href="#">Lihat Demo</a>
            </div>
          </div> */}
        </div>
      </div>

      <div className="features" id="fitur">
        <h1>Fitur - Fitur</h1>
        <div className="features-container">
          <div className="feature-item">
            <img src="img/fitur1.png" alt="Icon 1" />
            <div className="feature-text">
              <h2>Atur Undangan Mandiri</h2>
              <p>
                Sesuaikan undangan Anda dengan mudah, mulai dari teks hingga
                desain.
              </p>
            </div>
          </div>
          <div className="feature-item">
            <img src="img/fitur2.png" alt="Icon 2" />
            <div className="feature-text">
              <h2>Musik</h2>
              <p>Tambahkan musik latar pilihan untuk suasana lebih istimewa.</p>
            </div>
          </div>
          <div className="feature-item">
            <img src="img/fitur3.png" alt="Icon 3" />
            <div className="feature-text">
              <h2>Galeri Foto</h2>
              <p>
                Pamerkan momen-momen indah dalam galeri foto yang elegan dan
                menarik.
              </p>
            </div>
          </div>
          <div className="feature-item">
            <img src="img/fitur4.png" alt="Icon 4" />
            <div className="feature-text">
              <h2>Kisah Cinta</h2>
              <p>
                Bagikan perjalanan cinta Anda melalui fitur Love Story yang
                disajikan secara menarik.
              </p>
            </div>
          </div>
          <div className="feature-item">
            <img src="img/fitur5.png" alt="Icon 5" />
            <div className="feature-text">
              <h2>Konfirmasi Kehadiran (RSVP)</h2>
              <p>
                Fitur RSVP memudahkan tamu untuk mengkonfirmasi kehadiran mereka
                secara online.
              </p>
            </div>
          </div>
          <div className="feature-item">
            <img src="img/fitur6.png" alt="Icon 6" />
            <div className="feature-text">
              <h2>Hadiah Pernikahan</h2>
              <p>
                Tamu dapat memberikan hadiah secara digital melalui fitur Gift
                yang praktis.
              </p>
            </div>
          </div>
          <div className="feature-item">
            <img src="img/fitur7.png" alt="Icon 6" />
            <div className="feature-text">
              <h2>Kode QR (Barcode)</h2>
              <p>
                Barcode memudahkan tamu mengakses undangan dengan memindai QR
                code.
              </p>
            </div>
          </div>
          <div className="feature-item">
            <img src="img/fitur8.png" alt="Icon 6" />
            <div className="feature-text">
              <h2>Siaran Undangan (Broadcast)</h2>
              <p>
                Kirimkan undangan secara cepat dan langsung kepada tamu melalui
                fitur Broadcast.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="contact" id="">
        <h2>Kontak Kami</h2>
        <div className="contact-info">
          <p>Insite Team&apos;s</p>
          <p>Jl. A.H. Nasution No.105, Cipadung Wetan, Kec. Cibiru,</p>
          <p>Kota Bandung, Jawa Barat 40614</p>
          <div className="social-icons">
            <a href="#" className="icon-link">
              <img src="img/sms.png" alt="" />
              <i className="fas fa-envelope"></i>
            </a>
            <a href="#" className="icon-link">
              <img src="img/whatsapp.png" alt="" />
              <i className="fab fa-whatsapp"></i>
            </a>
            <a href="#" className="icon-link">
              <img src="img/instagram.png" alt="" />
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="icon-link">
              <img src="img/xtwitter.png" alt="" />
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>

      <footer>
        <div className="footer-content">
          <p>&copy; Copyright 2024. All Rights Reserved.</p>
          <a href="#" className="footer-link">
            Terms & Privacy
          </a>
        </div>
      </footer>
    </section>
  );
}
