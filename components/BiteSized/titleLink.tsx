import { Anchor, Box, Flex, Space, Title, useMantineTheme } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';

import Link from 'next/link';

interface TitleLinkProps {
  linkPath?: string;
  title: string;
  color?: string;
  size?: string;
  bottomSpace?: boolean;
}

export function TitleLink({ linkPath, title, size, color, bottomSpace }: TitleLinkProps) {
  const theme = useMantineTheme();

  return (
    <Box>
      {linkPath ? (
        <Anchor
          component={Link}
          // href={`/shows/${showId}/${showName ? encodeURIComponent(showName.toString()) : ''}/seasons`}
          href={linkPath}
          sx={{
            '&:hover': {
              textDecorationColor: theme.colors.gray[2],
            },
          }}
        >
          <Flex align="center" c="gray.2">
            <Title
              c={color || 'gray.2'}
              size={size || 'h3'}
              pl={8}
              inline
              sx={{
                borderLeft: `2.5px solid ${theme.colors.yellow[5]}`,
              }}
            >
              {title}
            </Title>

            <IconChevronRight size={28} style={{ paddingTop: 2 }} />
          </Flex>
        </Anchor>
      ) : (
        <Title
          c={color || 'gray.2'}
          size={size || 'h3'}
          pl={8}
          inline
          sx={{
            borderLeft: `2.5px solid ${theme.colors.yellow[5]}`,
          }}
        >
          {title}
        </Title>
      )}
      {bottomSpace ? <Space h="md" /> : null}
    </Box>
  );
}
