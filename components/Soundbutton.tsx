import ReactHowler from "react-howler";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { MusicData } from "@/lib/interface";


interface SoundButtonProps {
  playPauseHandler: () => void; // Fungsi tanpa argumen dan tanpa return
  isPlaying: boolean; // Status apakah sedang bermain atau tidak
  MusicData? : MusicData
}

const SoundButton: React.FC<SoundButtonProps> = ({ playPauseHandler, isPlaying,MusicData }) => {
  if(!MusicData){
    return <div>Gak ada music</div>
  }
  return (
    <motion.div
      initial={{ x: 100, rotate: 180 }}
      animate={{ x: 0, rotate: 0 }}
      transition={{ duration: 0.6, type: "spring", delay: 0.5 }}
      className="fixed z-30 top-5 right-5"
    >
      <ReactHowler playing={isPlaying} src={MusicData.musicUrl} loop />
      <button
        className="w-12 h-12 rounded-full bg-white/70 backdrop-blur-md drop-shadow-xl"
        onClick={playPauseHandler}
      >
        {isPlaying ? (
          <FontAwesomeIcon style={{ fontSize: "1.2em" }} icon={faPause} />
        ) : (
          <FontAwesomeIcon style={{ fontSize: "1.2em" }} icon={faPlay} />
        )}
      </button>
    </motion.div>
  );
};

export default SoundButton;
