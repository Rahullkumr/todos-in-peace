import { Box } from '@chakra-ui/react';

const BackgroundVideo = ({ ref, src }) => (
  <>
    <video
      ref={ref}
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
      <source src={src} type="video/mp4" />
    </video>

    {/* Overlay */}
    <Box
      position="fixed" top="0" left="0" w="100%" h="100%"
      bg="blackAlpha.400" zIndex="-1"
    />
  </>
);

export default BackgroundVideo;
