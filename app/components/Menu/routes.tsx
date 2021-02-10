import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from '@material-ui/icons/Home';
import HotelIcon from '@material-ui/icons/Hotel';
import MapIcon from '@material-ui/icons/Map';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import * as React from 'react';

import * as logo from '../../images/eandm.webp';
import { About } from '../About';
import { Venue } from '../Venue';
import { WeddingParty } from '../WeddingParty';

type Route = {
  href: string;
  label: string | JSX.Element;
  alt?: string;
  icon: JSX.Element;
  underConstruction?: boolean;
  content: JSX.Element;
};

export const routes: Route[] = [
  {
    href: '/',
    label: <img src={logo} alt="E + M logo" />,
    alt: 'Home',
    icon: <HomeIcon />,
    content: <About />,
  },
  {
    href: '/wedding-party',
    label: 'Wedding Party',
    icon: <GroupIcon />,
    content: <WeddingParty />,
  },
  { href: '/venue', label: 'Venue Map', icon: <MapIcon />, content: <Venue /> },
  {
    href: '/registry',
    label: 'Registry',
    icon: <ShoppingCartIcon />,
    content: <></>,
    underConstruction: true,
  },
  {
    href: '/accomodations',
    label: 'Accomodations',
    icon: <HotelIcon />,
    content: <></>,
    underConstruction: true,
  },
];
