import {List, ListItem, Box, Typography} from '@material-ui/core'
import Link from 'next/link'
import {PrimaryLink} from '../items/links'

export default function MainSideNav() {

    return (
        <Box pl={1}>
            <List component="nav" style={{fontSize: '1.1rem'}}>
                <ListItem>
                    <Link href="/authors">
                        <a>
                            <PrimaryLink variant="body1">
                                Authors
                            </PrimaryLink>
                        </a>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link href="/books">
                        <a>
                            <PrimaryLink variant="body1">
                                Books
                            </PrimaryLink>
                        </a>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link href="/passages">
                        <a>
                            <PrimaryLink variant="body1">
                                Passages
                            </PrimaryLink>
                        </a>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link href="/timeperiods">
                        <a>
                            <PrimaryLink variant="body1">
                                Time Periods
                            </PrimaryLink>
                        </a>
                    </Link>
                </ListItem>
            </List>
        </Box>
    )
}