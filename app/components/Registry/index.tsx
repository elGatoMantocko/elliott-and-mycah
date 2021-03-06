import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

import * as amazon from '../../images/logos/amazon.webp';
import * as crateAndBarrel from '../../images/logos/crate_and_barrel.webp';
import * as macys from '../../images/logos/macys.webp';
import * as williamsSanoma from '../../images/logos/williams_sonoma.webp';

export const Registry = () => (
  <>
    <Container maxWidth="sm">
      <Box pt={8}>
        <Typography gutterBottom align="center">
          Please know that your presence at our wedding is more than enough! However, for friends
          and family who have been asking for gift ideas, we’ve created an online registry with
          these stores:
        </Typography>
      </Box>
    </Container>
    <Container maxWidth="md">
      <Box display="flex" justifyContent="space-around" flexWrap="wrap" my={6}>
        <Box maxWidth="11rem" my="auto" py={4} px={1.5}>
          <Link target="_blank" href="https://www.macys.com/wgl/registry/guest/7231659">
            <img style={{ width: '100%' }} src={macys} />
          </Link>
        </Box>
        <Box maxWidth="11rem" my="auto" py={4} px={1.5}>
          <Link
            target="_blank"
            href="https://www.crateandbarrel.com/gift-registry/mycah-davis-and-elliott-mantock/r6196320"
          >
            <img style={{ width: '100%' }} src={crateAndBarrel} />
          </Link>
        </Box>
        <Box maxWidth="11rem" my="auto" py={4} px={1.5}>
          <Link
            target="_blank"
            href="https://www.williams-sonoma.com/registry/gvbzch695m/registry-list.html?removed=true"
          >
            <img style={{ width: '100%' }} src={williamsSanoma} />
          </Link>
        </Box>
        <Box maxWidth="11rem" my="auto" py={4} px={1.5}>
          <Link
            target="_blank"
            href="https://www.amazon.com/wedding/mycah-davis-elliott-mantock--june-2021/registry/2HVJLUOV8LBF2"
          >
            <img style={{ width: '100%' }} src={amazon} />
          </Link>
        </Box>
      </Box>
      <Box mb={10}>
        <Typography gutterBottom align="center">
          Items can be shipped to our home address:
        </Typography>
        <Typography variant="body2" align="center">
          12817 14th Ave SW
          <br />
          Burien, WA 98146
        </Typography>
      </Box>
    </Container>
  </>
);
