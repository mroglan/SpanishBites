import React, {useState, useMemo} from 'react'
import {ClientTimePeriod, ClientUnpopulatedAuthor, ClientUnpopulatedBook, ClientBook} from '../../../../database/dbInterfaces'
import styles from '../../../../styles/ResourceList.module.css'
import {Box, Typography, Divider, Grid, Collapse} from '@material-ui/core'
import Link from 'next/link'
import {PrimaryLink, SecondaryLink} from '../../../items/links'
import TextDisplay from '../../../mui-rte/TextDisplay'
import {SmallCollage} from '../../../items/collage'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface Props {
    timePeriods: ClientTimePeriod[];
    authors: ClientUnpopulatedAuthor[][];
    books: ClientBook[][];
}

interface ContentItem {
    title: {text:string;href:string;as:string};
    subtitle: string;
    img: string;
}

export function ContentItem({title, subtitle, img}:ContentItem) {

    return (
        <div>
            <Grid container wrap="nowrap" spacing={2} alignItems="center">
                <Grid item>
                    <img src={img || '/no-profile.jpg'} alt={title.text}
                    title={title.text} style={{maxHeight: 100}} />
                </Grid>
                <Grid item style={{flexGrow: 1}}>
                    <Box>
                        <Link href={title.href} as={title.as}>
                            <a data-testid="authorName">
                                <PrimaryLink variant="body1">
                                    {title.text}
                                </PrimaryLink>
                            </a>
                        </Link>
                    </Box>
                    <Box mt={1}>
                        <Typography variant="body1">
                            {subtitle}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}

export default function List({timePeriods, authors, books}:Props) {

    const [previewOnly, setPreviewOnly] = useState(timePeriods.map(period => true))

    const viewMore = (i:number) => {
        const copy = [...previewOnly]
        copy[i] = false
        setPreviewOnly(copy)
    }

    const authorContent = useMemo(() => {
        return authors.map(authorArr => authorArr.map(author => ({
            title: {
                text: author.firstName + ' ' + author.lastName,
                href: '/library/authors/[id]',
                as: `/library/authors/${author._id}`
            },
            subtitle: `${author.birthDate} - ${author.deathDate}`,
            img: author.image
        })))
    }, [authors])

    const bookContent = useMemo(() => {
        return books.map(bookArr => bookArr.map(book => ({
            title: {
                text: book.title,
                href: '/library/books/[id]',
                as: `/library/books/${book._id}`
            },
            subtitle: book.authors.map((author, i) => (
                author.firstName + ' ' + author.lastName + (i + 1 === book.authors.length ? '' : ', ' )
            )).join(''),
            img: book.image
        })))
    }, [books])

    return (
        <Box>
            {timePeriods.map((period, i) => (
                <div className={`${styles['period-root']} ${i + 1 < timePeriods.length ? styles['timeline-line'] : ''}`} key={i}>
                    <div className={`${styles['period-content']} ${i > 0 ? styles['top-dot'] : ''} ${i + 1 < timePeriods.length ? styles['bottom-dot'] : ''}`}>
                        <Box textAlign="center">
                            <Link href="/library/timeperiods/[id]" as={`/library/timeperiods/${period._id}`}>
                                <a data-testid="periodListItemName">
                                    <PrimaryLink variant="h5">
                                        {period.name} ({period.dateRange[0]} - {period.dateRange[1]})
                                    </PrimaryLink>
                                </a>
                            </Link>
                        </Box>
                        <Box>
                            <Collapse in={!previewOnly[i]} collapsedHeight={100}>
                                <div style={{ overflow: 'hidden'}}
                                data-testid="periodListItemIntro">
                                    <TextDisplay text={period.intro} />
                                </div>
                            </Collapse>
                            {previewOnly[i] && <Box mt={0}>
                                <SecondaryLink onClick={() => viewMore(i)}
                                style={{cursor: 'pointer'}} variant="body1">
                                    Read more
                                </SecondaryLink>
                            </Box>}
                        </Box>
                        <Divider style={{margin: '1rem 0'}} />
                        <Box>
                            <Accordion classes={{root: styles.accordion}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon color="secondary" />}>
                                    <Typography color="secondary" variant="body1">
                                        Authors
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className={styles['content-list-container']}>
                                        {authorContent[i].map(content => (
                                            <div key={content.title.text}>
                                                <ContentItem title={content.title} subtitle={content.subtitle} img={content.img} />
                                            </div>
                                        ))}
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                        <Box mt={2}>
                            <Accordion classes={{root: styles.accordion}}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon color="secondary" />}>
                                    <Typography color="secondary" variant="body1">
                                        Books
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div className={styles['content-list-container']}>
                                        {bookContent[i].map(content => (
                                            <div key={content.title.text}>
                                                <ContentItem title={content.title} subtitle={content.subtitle} img={content.img} />
                                            </div>
                                        ))}
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                        <div className={styles['timeperiod-marker']} id={period._id} />
                    </div>
                </div>
            ))}
        </Box>
    )
}