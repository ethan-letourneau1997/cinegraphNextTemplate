import {
  Anchor,
  AspectRatio,
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  Group,
  SimpleGrid,
  Spoiler,
  Text,
  Title,
} from '@mantine/core';

import { BsFillStarFill } from 'react-icons/bs';
import Image from 'next/image';
import Link from 'next/link';

import { useMediaQuery } from '@mantine/hooks';
import { FaCircle } from 'react-icons/fa';
import React from 'react';
import Trailer from './trailer';
import { formatReleaseDate } from '../Discover/discoverGrid';
import { MediaItemType } from '../../Types/types';

interface LetterBoxdProp {
  mediaItem: MediaItemType;
  mediaType: string;
}

export function LetterBoxd({ mediaItem, mediaType }: LetterBoxdProp) {
  // responsive styles
  const desktop = useMediaQuery('(min-width: 768px)');
  const tablet = useMediaQuery('(max-width: 950px)');
  const mobile = useMediaQuery('(max-width: 500px)');

  const trailers = mediaItem.videos.results.filter((video) => video.type === 'Trailer');

  return (
    <Box>
      <Grid gutter="xl">
        <Grid.Col span={12} xs={4} sm={3}>
          <AspectRatio ratio={2 / 3}>
            <Image
              fill
              alt=""
              src={
                mediaItem.poster_path
                  ? `https://image.tmdb.org/t/p/w780${mediaItem.poster_path}`
                  : '/media_placeholder_lg.png'
              }
              style={{
                borderRadius: '4px',
                border: '.5px solid #3F3F46',
              }}
            />
          </AspectRatio>
          {trailers.length > 0 ? <Trailer trailer={trailers[0]} /> : null}
        </Grid.Col>

        <Grid.Col span={12} xs={8} sm={9}>
          <Box>
            <Title size="h2">{mediaItem.title || mediaItem.name}</Title>
            <Flex gap={6}>
              <Text fz={mobile ? 'sm' : 'md'} c="brand.2">
                {' '}
                {mediaItem.release_date?.substring(0, 4) ||
                  mediaItem.first_air_date?.substring(0, 4)}
                {mediaType === 'tv' && mediaItem.lastAirDate
                  ? `-${mediaItem.lastAirDate.substring(0, 4)}`
                  : null}
              </Text>
              {mediaType === 'movie' && mediaItem.created_by && mediaItem.created_by.length > 0 ? (
                <>
                  <Text fz={mobile ? 'sm' : 'md'} c="dimmed">
                    Created by
                  </Text>
                  <Text lineClamp={1}>
                    {mediaItem.directingCrew?.slice(0, tablet ? 1 : 2).map((crew, index) => (
                      <Text fz={mobile ? 'sm' : 'md'} c="brand.2" key={crew.id}>
                        {crew.name}
                        {mediaItem.directingCrew &&
                        mediaItem.directingCrew &&
                        index !== mediaItem.directingCrew.length - 1 ? (
                          <>,&nbsp; </>
                        ) : null}
                      </Text>
                    ))}
                  </Text>
                </>
              ) : (
                <>
                  <Text fz={mobile ? 'sm' : 'md'} c="dimmed">
                    Directed by
                  </Text>
                  <Flex>
                    {mediaItem.created_by?.slice(0, tablet ? 1 : 2).map((credit, index) => (
                      <Anchor
                        c="brand.2"
                        key={credit.id}
                        fz={mobile ? 'sm' : 'md'}
                        component={Link}
                        href={`/people/${credit.id}/${encodeURIComponent(credit.name || '')}`}
                      >
                        {' '}
                        {credit.name}
                        {!tablet && index !== mediaItem.created_by!.length - 1 ? (
                          <>,&nbsp;</>
                        ) : null}
                      </Anchor>
                    ))}
                  </Flex>
                </>
              )}

              <Group fz="sm" spacing={5} display={desktop ? 'flex' : 'none'}>
                <Divider
                  display={mobile ? 'none' : 'block'}
                  my={2}
                  mx={6}
                  color="dark.3"
                  orientation="vertical"
                />{' '}
                {mediaItem.genres
                  ?.slice(0, tablet ? 2 : 2) // Use the slice() method to get the first three items
                  .map((genre, index) => (
                    <Group spacing={0} key={genre.id}>
                      <Text fw={300}>{genre.name}</Text>
                      <Text fw={300}>
                        {mediaItem.genres &&
                        index !== 3 &&
                        index !== mediaItem.genres.slice(0, tablet ? 2 : 2).length - 1 ? (
                          <Center c="dark.1" pl={10} pr={5} pt={2}>
                            <FaCircle size={4} />
                          </Center>
                        ) : null}
                      </Text>
                    </Group>
                  ))}
              </Group>
            </Flex>
            {mediaItem.tagline && (
              <Text fz="sm" mt="md" c="dimmed" italic>
                {mediaItem.tagline}
              </Text>
            )}
            <Title mt="xl" fw={600} size="h5">
              Plot
            </Title>
            <Spoiler
              mt={6}
              fz="sm"
              maxHeight={70}
              showLabel="Read more"
              hideLabel="Read less"
              styles={(theme) => ({
                control: {
                  fontSize: theme.fontSizes.sm,
                  color: theme.colors.blue[7],
                },
              })}
            >
              {mediaItem.overview}
            </Spoiler>
            <Divider my="xs" color="dark.5" />
            <Title fw={600} size="h5" pt="sm">
              Details
            </Title>
            <SimpleGrid mt={desktop ? 6 : 'xs'} cols={desktop ? 2 : 1} spacing="xs" fz="sm">
              <Flex gap={5}>
                <Text fw={500}>Score:</Text>
                <Group spacing={4}>
                  <BsFillStarFill size={12} color="#ffd452" />
                  <Text c="dark.0" fz="sm">
                    {mediaItem.vote_average?.toFixed(1)}
                  </Text>
                </Group>
              </Flex>
              <Flex gap={5}>
                <Text fw={500}>Content Rating: </Text>
                <Group>
                  <Text
                    fz="xs"
                    px="xs"
                    fw={300}
                    sx={(theme) => ({
                      border: '.5px solid',
                      borderColor: theme.colors.dark[0],
                    })}
                  >
                    {mediaItem.certification ? mediaItem.certification : 'NR'}
                  </Text>
                </Group>
              </Flex>
              <Flex gap={5}>
                <Text fw={500}>Runtime:</Text>
                <Text c="dark.0">{mediaItem.formattedRuntime}</Text>
              </Flex>
              {mediaType === 'movie' ? (
                <Flex gap={5}>
                  <Text fw={500}>Budget:</Text>
                  <Text c="dark.0" fw={300}>
                    ${mediaItem.budget?.toLocaleString()}
                  </Text>
                </Flex>
              ) : (
                <Flex gap={5}>
                  <Text fw={500}>Seasons:</Text>
                  <Text c="dark.0" fw={300}>
                    {mediaItem.number_of_seasons?.toLocaleString()}
                  </Text>
                </Flex>
              )}
              <Flex gap={5}>
                <Text fw={500}>Release Date:</Text>
                <Text c="dark.0" fw={300}>
                  {formatReleaseDate(mediaItem.release_date || mediaItem.first_air_date)}
                </Text>
              </Flex>
              {mediaType === 'movie' ? (
                <Flex gap={5}>
                  <Text fw={500}>Box Office:</Text>
                  <Text c="dark.0" fw={300}>
                    ${mediaItem.revenue?.toLocaleString()}
                  </Text>
                </Flex>
              ) : (
                <Flex gap={5}>
                  <Text fw={500}>Episodes:</Text>
                  <Text c="dark.0" fw={300}>
                    {mediaItem.number_of_episodes?.toLocaleString()}
                  </Text>
                </Flex>
              )}
            </SimpleGrid>
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
