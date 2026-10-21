import { Box, Container, VStack } from '@chakra-ui/react';
import StickyNote from '../StickyNote/StickyNote';

// Sticky note colors + slight tilt for a hand-placed look
const stickyColors = ['#FEF08A', '#FBCFE8', '#BFDBFE', '#BBF7D0', '#FED7AA', '#DDD6FE'];
const tilts = [-2.5, 1.5, -1, 2, -2, 1];

const TaskBoard = ({ todos, onRemove }) => (
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
          <StickyNote
            key={todo.id}
            todo={todo}
            color={stickyColors[index % stickyColors.length]}
            tilt={tilts[index % tilts.length]}
            onRemove={onRemove}
          />
        ))}
      </Box>
    </VStack>
  </Container>
);

export default TaskBoard;
