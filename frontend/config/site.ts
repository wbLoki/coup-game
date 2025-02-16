export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: 'Gaming House',
    description: 'Play board games with your friends online.',
    navItems: [
        {
            label: 'Home',
            href: '/',
        },
        {
            label: 'Games',
            href: '/games',
        },
        {
            label: 'About',
            href: '/about',
        },
    ],
    navMenuItems: [
        {
            label: 'Profile',
            href: '/profile',
        },
        {
            label: 'Settings',
            href: '/settings',
        },
        {
            label: 'Logout',
            href: '/logout',
        },
    ],
    links: {
        discord: 'https://discord.gg/FjQqsUABq5',
        sponsor: '',
    },
};

