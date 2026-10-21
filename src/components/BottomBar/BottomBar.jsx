import { Flex } from '@chakra-ui/react';
import TaskInput from './TaskInput';
import Clock from './Clock';
import VideoToggle from './VideoToggle';

// Bottom Bar: input (left), clock (center), play/pause (right)
const BottomBar = ({ onAdd, isPlaying, onToggleVideo }) => (
  <Flex
    position="fixed"
    bottom="20px"
    left="0"
    w="100%"
    px="30px"
    align="center"
    justify="space-between"
    zIndex="2"
  >
    <TaskInput onAdd={onAdd} />
    <Clock />
    <VideoToggle isPlaying={isPlaying} onToggle={onToggleVideo} />
  </Flex>
);

export default BottomBar;
