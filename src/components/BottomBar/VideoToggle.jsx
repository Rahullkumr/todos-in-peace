import { IconButton } from '@chakra-ui/react';
import { Play, Pause } from 'lucide-react';

const VideoToggle = ({ isPlaying, onToggle }) => (
  <IconButton
    size="sm"
    bg="transparent"
    color="white"
    onClick={onToggle}
  >
    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
  </IconButton>
);

export default VideoToggle;
