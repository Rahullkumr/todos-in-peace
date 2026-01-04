import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Input,
  List,
  IconButton,
  Text,
  Flex,
  VStack
} from '@chakra-ui/react';
import { Play, Pause, X } from 'lucide-react';

const App = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [inputValue, setInputValue] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(new Date());
  const videoRef = useRef(null);

  // 1. Clock Logic (Kept in Effect as it's a subscription to a timer)
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. Local Storage Sync Logic
  // Only handle WRITING to localStorage here.
  // Reading is handled above in useState.
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // 3. Handlers
  const addTodo = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      setTodos((prev) => [...prev, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeTodo = (index) => {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  };

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
      <Container maxW="md" pt="12vh" zIndex="1">
        <VStack gap={6}>
          <Input
            placeholder="Add a new task..."
            bg="whiteAlpha.900"
            color="gray.800"
            _placeholder={{ color: 'gray.500' }}
            borderRadius="full"
            size="xl"
            px={8}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={addTodo}
            textAlign="center"
            boxShadow="2xl"
            border="none"
          />

          <List.Root variant="none" w="100%" gap={2}>
            {todos.map((todo, index) => (
              <List.Item
                key={`${todo}-${index}`}
                bg="blackAlpha.500"
                backdropFilter="blur(12px)"
                px={5}
                py={3}
                borderRadius="xl"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                color="white"
                border="1px solid"
                borderColor="whiteAlpha.200"
              >
                <Text fontWeight="medium">{todo}</Text>
                <IconButton
                  aria-label="Delete"
                  variant="ghost"
                  color="red.300"
                  size="sm"
                  onClick={() => removeTodo(index)}
                  _hover={{ bg: "red.500", color: "white" }}
                >
                  <X size={18} />
                </IconButton>
              </List.Item>
            ))}
          </List.Root>
        </VStack>
      </Container>

      {/* Digital Clock */}
      <Flex
        position="fixed"
        bottom="30px"
        left="50%"
        transform="translateX(-50%)"
        bg="blackAlpha.700"
        backdropFilter="blur(15px)"
        px={8}
        py={3}
        borderRadius="3xl"
        border="1px solid"
        borderColor="whiteAlpha.300"
      >
        <Text color="white" fontFamily="monospace" fontSize="2xl" fontWeight="bold">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </Flex>

      {/* Play/Pause Button */}
      <IconButton
        position="fixed"
        bottom="28px"
        right="30px"
        size="sm"
        bg="transparent"
        color="white"
        onClick={toggleVideo}
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </IconButton>
    </Box>
  );
};

export default App;
