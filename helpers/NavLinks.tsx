import { MySelection } from "../types/menu";


export const mobileMenuSelections: MySelection[] = [
    {
        name: 'HOME',
        href: 'https://www.pdireserves.com/',
        types: 'ext'
    },
    {
      name: 'RESERVE STUDIES',
      href: 'https://www.pdireserves.com/index.php?id=5',
      types: 'ext'
    },
    {
      name: 'ABOUT US',
      href: 'https://www.pdireserves.com/index.php?id=13',
      types: 'ext',
      subMenu: [
        {
          name: 'OUT TEAM',
          href:'https://www.pdireserves.com/index.php?id=14',
          types: 'ext'
        },
        {
          name: 'OUT BLOG',
          href:'https://pdireserves.com/index.php?id=28',
          types: 'ext'
        }
      ]
    },
    {
      name: 'CONTACT US',
      href: 'https://www.pdireserves.com/index.php?id=27',
      types: 'ext'
    },
    {
      name: "REQUEST A QUOTE",
      href: "https://pdireserves.com/request-a-quote/",
      types: "ext"
    },
    {
      name: 'SIGN-IN',
      href: '/',
      types: 'int'
    }
]

export const mobileMenuAuthSelections: MySelection[] = [
    {
        name: 'HOME',
        href: '/auth',
        types: 'int'
    },
    {
      name: "CLIENTS",
      href: '/admin/clients',
      types: 'admin'
    },
    {
      name: 'PROPERTIES',
      href: '/auth/properties',
      types: 'int'
    },
    {
      name: 'ACCOUNT',
      href: '/auth/account',
      types: 'int',
      subMenu: [
        {
          name: 'SETTINGS',
          href:'/auth/account/settings',
          types: 'int'
        }
      ]
    },
    {
      name: 'LOGOFF',
      href: '/',
      types: 'int'
    }
]