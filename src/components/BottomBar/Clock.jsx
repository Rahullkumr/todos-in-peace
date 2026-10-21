import { Flex, Text } from '@chakra-ui/react';
import { useClock } from '../../hooks/useClock';

const Clock = () => {
  const time = useClock();

  return (
    <Flex shadow="sm" px={5} py={2} borderRadius="full">
      <Text color="white" fontFamily="monospace" fontSize="xl">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </Flex>
  );
};

export default Clock;
