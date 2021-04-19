import React from 'react'
import {Box, Grid, Typography} from '@material-ui/core'
import {PrimaryLink} from '../../items/links'
import Link from 'next/link'

interface Props {
    title: string;
    subtitle: string;
    image: string;
    link: {
        as: string;
        href: string;
    }
}

export default function ListItem({title, subtitle, image, link}:Props) {

    return (
        <div>
            <Box my={1} style={{breakInside: 'avoid'}}>
                <div data-testid="detailedAuthorItem">
                    <Grid container wrap="nowrap" spacing={2} alignItems="center">
                        <Grid item>
                            <img src={image || '/no-profile.jpg'} alt={title}
                            title={title} data-testid="listitem-image" />
                        </Grid>
                        <Grid item style={{flexGrow: 1}}>
                            <Box>
                                <Link href={link.href} as={link.as}>
                                    <a data-testid="listitem-title">
                                        <PrimaryLink variant="body1">
                                            {title}
                                        </PrimaryLink>
                                    </a>
                                </Link>
                            </Box>
                            <Box mt={1}>
                                <Typography data-testid="listitem-subtitle" variant="body1">
                                    {subtitle}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
            </Box>
        </div>
    )
}