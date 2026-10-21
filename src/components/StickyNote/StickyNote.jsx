import { Box, IconButton, Text } from '@chakra-ui/react';
import { X } from 'lucide-react';
import Thumbtack from './Thumbtack';
import './StickyNote.css';

const handwriting = "'Comic Sans MS', 'Segoe Print', cursive";

const StickyNote = ({ todo, color, tilt, onRemove }) => (
  <Box
    className="sticky-card"
    position="relative"
    display="inline-block"
    w="100%"
    mb={6}
    bg={color}
    color="gray.800"
    minH="120px"
    px={4}
    pt={5}
    pb={todo.createdAt ? 8 : 4}
    borderRadius="2px"
    boxShadow="0 6px 14px rgba(0,0,0,0.35)"
    transform={`rotate(${tilt}deg)`}
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
      onClick={() => onRemove(todo.id)}
      _hover={{ bg: 'transparent', color: 'red.500' }}
    >
      <X size={16} />
    </IconButton>
    <Text
      fontWeight="medium"
      fontFamily={handwriting}
      whiteSpace="pre-wrap"
      wordBreak="break-word"
    >
      {todo.text}
    </Text>
    {/* Handwritten date in the bottom corner */}
    {todo.createdAt && (
      <Text
        position="absolute"
        bottom="8px"
        right="12px"
        fontSize="xs"
        color="gray.600"
        fontFamily={handwriting}
        transform="rotate(-2deg)"
      >
        {new Date(todo.createdAt).toLocaleDateString([], {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })}
      </Text>
    )}
  </Box>
);

export default StickyNote;
