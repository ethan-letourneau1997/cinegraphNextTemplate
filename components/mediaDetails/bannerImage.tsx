import { AspectRatio, BackgroundImage, Box, Group, Skeleton } from '@mantine/core';

import { MediaItemType } from '../../Types/types';

interface BannerImageProps {
  mediaBackdrop: MediaItemType['backdrop_path'];
  aspectRatio: number;
}

export default function BannerImage({ mediaBackdrop, aspectRatio }: BannerImageProps) {
  return (
    <Box>
      <AspectRatio ratio={aspectRatio}>
        <Skeleton
          sx={{
            zIndex: -10,
          }}
        />
        <BackgroundImage
          // sx={{
          //   zIndex: -10,
          // }}
          src={`https://image.tmdb.org/t/p/original${mediaBackdrop}`}
        >
          <Group position="apart" h="100%" w="100%">
            <Box h="100%" w={15} pos="relative">
              <Box
                h="100%"
                w="100%"
                pos="absolute"
                sx={{
                  backgroundImage: 'linear-gradient(to right, #101113, transparent)',
                }}
              />
            </Box>
            <Box h="100%" w={15} pos="relative">
              <Box
                h="100%"
                w="100%"
                pos="absolute"
                sx={{
                  backgroundImage: 'linear-gradient(to left, #101113, transparent)',
                }}
              />
            </Box>
          </Group>
        </BackgroundImage>
      </AspectRatio>

      <Box pos="relative">
        <Box
          pos="absolute"
          top={-50}
          w="100%"
          h={50}
          sx={{
            backgroundImage: 'linear-gradient(to top, #101113, transparent)',
          }}
        />
      </Box>
    </Box>
  );
}
