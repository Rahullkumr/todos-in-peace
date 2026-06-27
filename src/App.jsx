import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Input,
  IconButton,
  Text,
  Flex,
  VStack
} from '@chakra-ui/react';
import { Play, Pause, X } from 'lucide-react';

// Realistic thumbtack drawn as an SVG (head viewed slightly from above)
const Thumbtack = ({ size = 26 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    style={{ filter: 'drop-shadow(0 3px 3px rgba(0,0,0,0.45))' }}
  >
    <defs>
      <radialGradient id="pinHead" cx="38%" cy="32%" r="70%">
        <stop offset="0%" stopColor="#ff9c9c" />
        <stop offset="45%" stopColor="#e23b3b" />
        <stop offset="100%" stopColor="#8f1414" />
      </radialGradient>
      <linearGradient id="pinNeck" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#7a0f0f" />
        <stop offset="50%" stopColor="#c62b2b" />
        <stop offset="100%" stopColor="#7a0f0f" />
      </linearGradient>
      <linearGradient id="pinNeedle" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#7c7c7c" />
        <stop offset="45%" stopColor="#e8e8e8" />
        <stop offset="100%" stopColor="#6a6a6a" />
      </linearGradient>
    </defs>
    {/* Needle */}
    <polygon points="30,44 34,44 32.6,62 31.4,62" fill="url(#pinNeedle)" />
    {/* Neck under the head */}
    <rect x="26" y="34" width="12" height="12" rx="3" fill="url(#pinNeck)" />
    {/* Round head */}
    <circle cx="32" cy="24" r="20" fill="url(#pinHead)" />
    {/* Shine */}
    <ellipse cx="24" cy="16" rx="7" ry="5" fill="#ffffff" opacity="0.55" />
  </svg>
);

const App = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    const parsed = savedTodos ? JSON.parse(savedTodos) : [];
    // Normalize any legacy object-form todos ({ text, createdAt }) back to strings
    return parsed.map((t) => (typeof t === 'string' ? t : t.text));
  });

  const [inputValue, setInputValue] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(new Date());
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      setTodos((prev) => [...prev, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeTodo = (index) => {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  };

  // Sticky note colors + slight tilt for a hand-placed look
  const stickyColors = ['#FEF08A', '#FBCFE8', '#BFDBFE', '#BBF7D0', '#FED7AA', '#DDD6FE'];
  const tilts = [-2.5, 1.5, -1, 2, -2, 1];

  const toggleVideo = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <Box position="relative" h="100vh" w="100vw" overflow="hidden">
      {/* Pushpin gloss-sweep animation (plain CSS for reliable keyframes) */}
      <style>{`
        @keyframes pinShine {
          0%   { left: -150%; }
          100% { left: 180%; }
        }
        .sticky-card:hover .pin-shine {
          animation: pinShine 1.2s ease-out;
        }
      `}</style>

      {/* Background Video */}
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -2
        }}
      >
        <source src="/beach.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <Box
        position="fixed" top="0" left="0" w="100%" h="100%"
        bg="blackAlpha.400" zIndex="-1"
      />

      {/* Task UI */}
      <Container
        maxW="100%"
        px={{ base: 4, md: 10 }}
        pt="4vh"
        pb="100px"
        zIndex="1"
        h="100vh"
        overflowY="auto"
        overflowX="hidden"
        css={{
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' }
        }}
      >
        <VStack gap={5} pt="14px">
          <Box
            w="100%"
            css={{ columnWidth: '240px', columnGap: '20px' }}
          >
            {todos.map((todo, index) => (
              <Box
                key={`${todo}-${index}`}
                className="sticky-card"
                position="relative"
                display="inline-block"
                w="100%"
                mb={6}
                bg={stickyColors[index % stickyColors.length]}
                color="gray.800"
                minH="120px"
                px={4}
                pt={5}
                pb={4}
                borderRadius="2px"
                boxShadow="0 6px 14px rgba(0,0,0,0.35)"
                transform={`rotate(${tilts[index % tilts.length]}deg)`}
                transition="transform 0.15s ease, box-shadow 0.15s ease"
                css={{ breakInside: 'avoid' }}
                _hover={{
                  transform: 'rotate(0deg) scale(1.03)',
                  boxShadow: '0 10px 22px rgba(0,0,0,0.4)',
                  zIndex: 1
                }}
              >
                {/* Push pin */}
                <Box
                  position="absolute"
                  top="-14px"
                  left="50%"
                  transform="translateX(-50%)"
                  zIndex={2}
                >
                  <Thumbtack size={26} />
                  {/* Gloss sweep clipped to the round pin head */}
                  <Box
                    position="absolute"
                    top="1px"
                    left="5px"
                    w="16px"
                    h="16px"
                    borderRadius="full"
                    overflow="hidden"
                    pointerEvents="none"
                  >
                    <Box
                      className="pin-shine"
                      position="absolute"
                      top="0"
                      left="-150%"
                      w="70%"
                      h="100%"
                      transform="skewX(-20deg)"
                      bg="linear-gradient(90deg, transparent, rgba(255,255,255,0.95), transparent)"
                    />
                  </Box>
                </Box>
                <IconButton
                  position="absolute"
                  top="2px"
                  right="2px"
                  color="gray.600"
                  bg="transparent"
                  size="xs"
                  onClick={() => removeTodo(index)}
                  _hover={{ bg: 'transparent', color: 'red.500' }}
                >
                  <X size={16} />
                </IconButton>
                <Text
                  fontWeight="medium"
                  fontFamily="'Comic Sans MS', 'Segoe Print', cursive"
                  whiteSpace="pre-wrap"
                  wordBreak="break-word"
                >
                  {todo}
                </Text>
              </Box>
            ))}
          </Box>
        </VStack>
      </Container>

      {/* Bottom Bar: input (left), clock (center), play/pause (right) */}
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
        {/* Input - left */}
        <Input
          placeholder="Add a new task"
          _placeholder={{ color: 'white' }}
          borderRadius="full"
          size="lg"
          px={6}
          w="320px"
          maxW="45%"
          minW="0"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={addTodo}
          color="white"
          cursor="default"
          boxShadow="sm"
          border="none"
        />

        {/* Clock - center */}
        <Flex shadow="sm" px={5} py={2} borderRadius="full">
          <Text color="white" fontFamily="monospace" fontSize="xl">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </Flex>

        {/* Play/Pause - right */}
        <IconButton
          size="sm"
          bg="transparent"
          color="white"
          onClick={toggleVideo}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </IconButton>
      </Flex>
    </Box>
  );
};

export default App;
