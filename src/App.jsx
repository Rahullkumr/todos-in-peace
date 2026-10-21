import { Box } from '@chakra-ui/react';
import BackgroundVideo from './components/BackgroundVideo/BackgroundVideo';
import TaskBoard from './components/TaskBoard/TaskBoard';
import BottomBar from './components/BottomBar/BottomBar';
import { useTodos } from './hooks/useTodos';
import { useVideoToggle } from './hooks/useVideoToggle';

const App = () => {
  const { todos, addTodo, removeTodo } = useTodos();
  const { videoRef, isPlaying, toggleVideo } = useVideoToggle();

  return (
    <Box position="relative" h="100vh" w="100vw" overflow="hidden">
      <BackgroundVideo ref={videoRef} src="/beach.mp4" />
      <TaskBoard todos={todos} onRemove={removeTodo} />
      <BottomBar onAdd={addTodo} isPlaying={isPlaying} onToggleVideo={toggleVideo} />
    </Box>
  );
};

export default App;
