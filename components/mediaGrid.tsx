import { Anchor, AspectRatio, Box, Image, SimpleGrid, Skeleton, Title } from '@mantine/core';

import Link from 'next/link';
import { MediaItemType } from '../Types/types';

interface MediaGridProps {
  items: MediaItemType[];
  title: string;
}

export default function MediaGrid({ items, title }: MediaGridProps) {
  return (
    <Box>
      <Title>{title}</Title>
      <SimpleGrid cols={6} mt="xl">
        {items.map(
          (item) =>
            item.poster_path && (
              <Box key={item.id}>
                <AspectRatio ratio={2 / 3}>
                  <Skeleton visible />
                  <Image
                    placeholder="blur"
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title}
                  />
                </AspectRatio>
                <Anchor
                  component={Link}
                  href={`/${item.title ? 'movies' : 'shows'}/${item.id}/${
                    item.title ? item.title : item.name
                  }`}
                >
                  {' '}
                  {item.title ? item.title : item.name}
                </Anchor>
              </Box>
            )
        )}
      </SimpleGrid>
    </Box>
  );
}
