import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    card: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    code: {
        backgroundColor: '#f5f5f5',
        borderRadius: theme.shape.borderRadius,
        fontFamily: 'Monaco, monospace',
        fontSize: '0.875rem',
        lineHeight: 1.6,
        overflowX: 'auto',
        padding: theme.spacing(1),
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
    },
}));

const CodeDisplay = ({ code }: any) => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography component="pre" className={classes.code}>
                    {code}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CodeDisplay;


