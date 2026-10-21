import { useState } from 'react';
import { Input } from '@chakra-ui/react';

const TaskInput = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
    }
  };

  return (
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
      onKeyDown={handleKeyDown}
      color="white"
      cursor="default"
      boxShadow="sm"
      border="none"
    />
  );
};

export default TaskInput;
