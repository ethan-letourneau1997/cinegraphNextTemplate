import {
  Box,
  Burger,
  Center,
  CloseButton,
  Collapse,
  Flex,
  NavLink,
  createStyles,
} from '@mantine/core';
import { FaSearch } from 'react-icons/fa';

import { useDisclosure, useElementSize, useMediaQuery, useScrollLock } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Autocomplete from '../Autocomplete/autocomplete';
import DesktopNavigation from './desktopNavigation';
import { MobileNavigation } from './mobileNavigation';

const useStyles = createStyles((theme) => ({
  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

export function NavigationLayout() {
  // styles
  const { classes } = useStyles();
  const mobile = useMediaQuery('(max-width: 48em)');

  // mobile nav state
  const [opened, { toggle }] = useDisclosure(false);
  const label = opened ? 'Close navigation' : 'Open navigation';

  function closeMobileNav() {
    toggle();
  }

  // lock scroll when nav is open
  const [lockScroll, setLockScroll] = useState(false);
  useScrollLock(lockScroll);

  // toggle nav
  const [search, setSearch] = useState(false);

  function handleLinkClick() {
    setSearch(false);
    setLockScroll(false);
  }

  function handleNavClose() {
    setSearch(false);
    setLockScroll(false);
  }

  function handleNavOpen() {
    setSearch(true);
    setLockScroll(true);
  }
  // prevent scroll on mobile nav
  useEffect(() => {
    if (opened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [opened]);

  // get height of navbar
  const { ref, height } = useElementSize();

  return (
    <Box
      bg={mobile ? 'dark.9' : 'transparent'}
      ref={ref}
      sx={{
        zIndex: 1000,
        width: '100vw',
      }}
    >
      <Flex justify="space-between" p="sm">
        <Center>
          <Burger
            className={classes.hiddenDesktop}
            opened={opened}
            onClick={toggle}
            aria-label={label}
          />
          <NavLink
            w={160}
            c="yellow.5"
            ml="xs"
            fw={700}
            component={Link}
            href="/"
            styles={(theme) => ({
              label: {
                fontSize: 25,
                '&:hover': {
                  color: theme.colors.dark[0],
                  backgroundColor: theme.colors.dark[9],
                },
              },
              root: {
                '&:hover': {
                  backgroundColor: theme.colors.dark[9],
                },
              },
            })}
            label="Cinegraph"
          />
        </Center>

        <DesktopNavigation />

        <Flex align="center" justify="flex-end" w={160} pr={mobile ? 'sm' : 'xl'} pt={5}>
          <Box onClick={search ? handleNavClose : handleNavOpen}>
            {search ? (
              <CloseButton
                size="md"
                pl={7}
                pb={3}
                sx={(theme) => ({
                  cursor: 'pointer',
                  '&:hover': {
                    color: theme.colors.yellow[5],
                    backgroundColor: 'transparent',
                  },
                })}
                onClick={handleNavClose}
              />
            ) : (
              <Box
                sx={(theme) => ({
                  cursor: 'pointer',
                  '&:hover': {
                    color: theme.colors.yellow[5],
                  },
                })}
              >
                <FaSearch onClick={handleNavOpen} />
              </Box>
            )}
          </Box>
        </Flex>
      </Flex>

      <Collapse
        className={classes.hiddenDesktop}
        pb="xl"
        w="100%"
        bg="dark.9"
        in={opened}
        pos="absolute"
        transitionDuration={250}
        transitionTimingFunction="linear"
        sx={{
          zIndex: 1000,
        }}
      >
        <MobileNavigation toggleMobileNav={closeMobileNav} />
      </Collapse>
      {search && <Autocomplete closeNav={handleLinkClick} navHeight={height} />}
    </Box>
  );
}
