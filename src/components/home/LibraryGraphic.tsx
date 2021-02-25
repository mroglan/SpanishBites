import React, {useRef, useState, useEffect} from 'react'
import styles from '../../styles/Library.module.css'
import {Grid, Typography} from '@material-ui/core'

const items = [
    {type: 'passage', image: '', title: '"El sueño"'},
    {type: 'author', image: 'https://res.cloudinary.com/dqtpxyaeo/image/upload/v1601585695/test/brpw6kwuppnfqznm0swg.jpg', title: 'Juan Del Encina'},
    {type: 'book', image: '', title: 'Don Quijote de la Mancha (1605)'}
]

export default function LibraryGraphic() {

    const mainRef = useRef<HTMLDivElement>()

    const [rows, setRows] = useState(0)

    useEffect(() => setRows(Math.floor(mainRef.current.clientWidth / 230)), [])

    return (
        <div style={{height: 250, position: 'relative'}} ref={mainRef}>
            <div className={styles['shelf-background']}>
                <div className={styles['display-panel-row']}>
                    <div>
                        <Grid container justify="space-around">
                            {Array(rows).fill('').map((_, i) => (
                                <Grid item key={i}>
                                    <div style={{cursor: 'initial'}} className={styles['display-item']}>
                                        <img src="/library/paper.png" className={styles.paper} title="Paper"/>
                                        <div className={styles['display-item-title']}>
                                            <Typography variant="body1">
                                                {items[i].title}
                                            </Typography>
                                        </div>
                                        <div className={styles['display-item-type']}>
                                            <Typography color="inherit" variant="body2">
                                                {items[i].type.toUpperCase()}
                                            </Typography>
                                        </div>
                                        {items[i].image && <div className={styles['display-item-img-container']}>
                                        <img src={items[i].image} className={styles['display-item-image']}/>
                                        </div>}
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                    <div className={styles.shelf} />
                </div>
            </div>
        </div>
    )
}