import { ReactNode } from 'react';
import { motion, useTransform, useViewportScroll } from 'framer-motion';

interface ParallaxProps {
  children: ReactNode;
  inView: [number, number];
  position: [number, number];
  rotation?: boolean;
}

const Parallax: React.FC<ParallaxProps> = ({ children, inView, position, rotation = false }) => {
  const { scrollYProgress } = useViewportScroll();
  const yValue = useTransform(scrollYProgress, [0, inView[0], inView[1], 1], [position[0], position[0], position[1], position[1]]);
  const rotateValue = useTransform(scrollYProgress, [0, inView[0], inView[1], 1], [0, 0, 180, 180]);

  return (
    <>
      {rotation ? (
        <motion.div
          style={{
            y: yValue,
            rotate: rotateValue,
          }}
        >
          {children}
        </motion.div>
      ) : (
        <motion.div
          style={{
            y: yValue,
          }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
};

export default Parallax;
