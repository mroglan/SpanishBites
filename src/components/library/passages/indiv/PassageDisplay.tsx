import React, {useState, ReactNode} from 'react'
import TextDisplay from '../../../mui-rte/TextDisplay'
import styles from '../../../../styles/Resource.module.css'
import {Typography, Box, Paper, Tabs, Tab, Table, TableBody, TableContainer, TableHead, TableRow, TableCell} from '@material-ui/core'

interface Props {
    englishText: string;
    spanishText: string;
    vocab: {term:string;def:string;}[];
}

interface TabPanelProps {
    children: ReactNode;
    index: number;
    value: number;
}

export function TabPanel({children, value, index}:TabPanelProps) {

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}>
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    )
}

export default function PassageDisplay({englishText, spanishText, vocab}:Props) {

    const [tabNum, setTabNum] = useState(0)

    const changeTab = (e, newVal:number) => {
        setTabNum(newVal)
    }

    return (
        <Paper className={styles['passage-display-root']}>
            <Box>
                <Tabs indicatorColor="primary" onChange={changeTab} value={tabNum}>
                    <Tab label="Spanish" id="simple-tab-0" aria-controls="simple-tabpanel-0" />
                    <Tab label="English" id="simple-tab-1" aria-controls="simple-tabpanel-1" />
                    <Tab label="Vocab" id="simple-tab-2" aria-controls="simple-tabpanel-2" />
                </Tabs>
            </Box>
            <Box px={3}>
                <TabPanel value={tabNum} index={0}>
                    <TextDisplay text={spanishText} />
                </TabPanel>
                <TabPanel value={tabNum} index={1}>
                    <TextDisplay text={englishText} />
                </TabPanel>
                <TabPanel value={tabNum} index={2}>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                {vocab.map((word, i) => (
                                    <TableRow key={i}>
                                        <TableCell>
                                            <b>{word.term}</b>
                                        </TableCell>
                                        <TableCell>
                                            {word.def}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>
            </Box>
        </Paper>
    )
}