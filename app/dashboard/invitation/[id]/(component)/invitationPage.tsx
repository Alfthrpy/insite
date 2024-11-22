'use client'
import { useState } from "react";

// Types and Interfaces
interface InvitationData {
  id: string;
  // Add other data properties as needed
}

interface Feature {
  icon: string;
  title: string;
  link?: string;
  special?: boolean;
  dynamicLink?: boolean; // New property to indicate if link should use data.id
}

interface FeatureCardProps extends Feature {
  onClick?: () => void;
}

interface InvitationPageProps {
  data: InvitationData;
}

// Component Types
type ToggleState = {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

// Components
const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  special = false,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center p-6 rounded-lg
        ${special 
          ? 'bg-neutral' 
          : 'bg-purpleHover hover:bg-purpleSecondary'}
        min-h-[144px] w-full transition-colors
        ${onClick ? 'cursor-pointer hover:scale-105 transition-transform' : ''}
      `}
    >
      <img src={icon} alt={`${title} icon`} className="w-8 mb-3" />
      <p className="text-base-100 text-center">{title}</p>
    </div>
  );
};

const HeaderCard: React.FC<ToggleState> = ({ isActive, setIsActive }) => {
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setIsActive(e.target.checked);
  };

  return (
    <div className="bg-purpleHover rounded-lg p-6 mb-6 relative">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold text-base-100">A dan B</h2>
        <label className="label cursor-pointer flex items-center">
          <span className="label-text text-white mr-2 font-bold">
            {isActive ? "Aktif" : "Non-Aktif"}
          </span>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={isActive}
            onChange={handleToggle}
          />
        </label>
      </div>
      <div className="text-center mt-4">
        <p className="text-sm text-base-100 font-bold">Link Undangan:</p>
        <a
          href="https://insite.com/A-B"
          className="text-sm text-white underline italic"
        >
          https://insite.com/A-B
        </a>
      </div>
    </div>
  );
};

// Main Component
const InvitationPage: React.FC<InvitationPageProps> = ({ data }) => {
  const [isActive, setIsActive] = useState<boolean>(true);

  // Define base features with dynamic link property
  const BASE_FEATURES: Feature[] = [
    {
      icon: "../../img/fiturLightMode/fitur1.png",
      title: "Nama Pengantin",
      dynamicLink: true // This feature needs a dynamic link
    },
    {
      icon: "../../img/fiturLightMode/layout.png",
      title: "Pilih Template"
    },
    {
      icon: "../../img/fiturLightMode/fitur3.png",
      title: "Galery"
    },
    {
      icon: "../../img/fiturLightMode/fitur2.png",
      title: "Tambahkan Musik"
    },
    {
      icon: "../../img/fiturLightMode/fitur6.png",
      title: "Kirim Hadiah"
    },
    {
      icon: "../../img/fiturLightMode/rsvp.png",
      title: "RSVP"
    },
    {
      icon: "../../img/fiturLightMode/fitur4.png",
      title: "Kisah Cinta"
    },
    {
      icon: "../../img/fiturLightMode/fitur7.png",
      title: "Buat Siaran Undangan"
    },
    {
      icon: "../../img/fiturLightMode/send.png",
      title: "Kirim",
      special: true
    }
  ];

  // Generate features with dynamic links
  const features = BASE_FEATURES.map(feature => ({
    ...feature,
    link: feature.dynamicLink 
      ? `/dashboard/invitation/${data.id}/bride-broom`
      : undefined
  }));

  const handleFeatureClick = (feature: Feature): void => {
    if (feature.link) {
      window.location.href = feature.link;
    }
  };

  return (
    <div className="container mx-auto w-full sm:w-4/5 lg:w-3/5 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <HeaderCard isActive={isActive} setIsActive={setIsActive} />

        <div className="divider"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div
              key={`feature-${index}`}
              className={`
                ${feature.special ? 'col-span-full lg:col-span-2' : ''}
              `}
            >
              <FeatureCard
                {...feature}
                onClick={feature.link ? () => handleFeatureClick(feature) : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvitationPage;