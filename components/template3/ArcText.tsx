import React from 'react';

interface HeadingProps {
  text: string; // Required string for the heading text
  arc?: number; // Optional number for the curvature of the text
  radius?: number; // Optional number for the radius of the curvature
}

const Heading: React.FC<HeadingProps> = ({ text, arc = 120, radius = 400 }) => {
  const characters = text.replace(/\s/g, "\u00A0").split('');
  const degree = arc / characters.length;

  return (
    <h1 className="absolute top-10 left-60 font-alice text-2xl text-base-100 border-2 border-neutral">
      {characters.map((char, i) => (
        <span
          key={`heading-span-${i}`}
          className="inline-block"
          style={{
            height: `${radius}px`,
            transform: `rotate(${i * degree - arc / 2}deg)`,
            transformOrigin: `0 ${radius}px 0`,
          }}
        >
          {char}
        </span>
      ))}
    </h1>
  );
};

export default Heading;
