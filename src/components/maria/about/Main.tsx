import React from 'react'
import {Box, Typography, Grid, Avatar} from '@material-ui/core'
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import styles from '../../../styles/About.module.css'
import {BluePrimaryIconButton, RedPrimaryIconButton} from '../../items/buttons'
import Link from 'next/link'

export default function Main() {

    return (
        <div>
            <Box my={3} mx={3}>
                <Box maxWidth={1000} mx="auto" >
                    <Grid container spacing={5} wrap="nowrap" className={styles['maria-content-grid']}>
                        <Grid item className={styles['maria-sidebar']}>
                            <Box mb={2} textAlign="center">
                                <Avatar src="/maria/about/headshot.png" alt="Picture of Maria" className={styles['maria-pic-avatar']} />
                            </Box> 
                            <Box>
                                <Grid container spacing={1} justify="center" className={styles['maria-socials']}>
                                    <Grid item>
                                        <Link href="#">
                                            <a>
                                                <BluePrimaryIconButton>
                                                    <TwitterIcon style={{fontSize: 40}} />
                                                </BluePrimaryIconButton>
                                            </a> 
                                        </Link>              
                                    </Grid>
                                    <Grid item>
                                        <Link href="#">
                                            <a>
                                                <BluePrimaryIconButton>
                                                    <FacebookIcon style={{fontSize: 40}} />
                                                </BluePrimaryIconButton>
                                            </a> 
                                        </Link>              
                                    </Grid>
                                    <Grid item>
                                        <Link href="#">
                                            <a>
                                                <BluePrimaryIconButton>
                                                    <InstagramIcon style={{fontSize: 40}} />
                                                </BluePrimaryIconButton>
                                            </a> 
                                        </Link>              
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box mb={1}>
                                <Typography variant="h3" color="secondary">
                                    Welcome...  
                                </Typography>     
                            </Box>  
                            <Box>
                                <Typography variant="body1" gutterBottom>
                                    This site is the product of a yearning through my teaching career to make available to motivated Spanish learners both the Spanish language and the multifaced world of Spanish literature. 
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" gutterBottom>
                                    The Site contains a curated chronology to better understand the context in which the literary works were created. There is an extensive index of the most relevant authors of Spanish literature, along with an ever-growing pool of extracts from its literary works. Given that Literature is an art, it is my belief that the student contact with the precise text is key to appreciate their understanding and hopefully grow their love both for the language and its literature. Additional features, such as the blog and the monthly book club are intended to create an atmosphere of community of learning and provide continuous opportunities for engagement.
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" gutterBottom>
                                    For the more ambitious learner, there is a premium section to study real extracts of literature extensively commented and annotated for a better comprehension of its content. It is the purpose of this Site to constitute a platform for the motivated Spanish learner to reach a level of understanding that permits the gradual increased mastery of the Spanish language through the ever-expanding world of Spanish literature. 
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </div>
    )
}