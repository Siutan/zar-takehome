import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import { Card } from '../../common/core/components';
import { DraftSummonerProfile } from '../1_draft-summoner-profile';

// https://v4.mui.com/styles/api/#examples-2
const useStyles = makeStyles(theme => ({
    root: {
        display: 'block',
        width: '100%',
        margin: 0,
    }
}));
export interface DraftSummonerProfilesProps {
    profiles: DraftSummonerProfile[];
}

// TODO: Use <DraftSummonerProfile> to render the passed profiles. Based on Figma:
// https://www.figma.com/file/0OzXZgcefj9s8aTHnACJld/Junior-React-Takehome?node-id=9%3A5887
// Notes:
// - <DraftSummonerProfile> shouldn't come with any margins
// Bonus points: Without using flex styles.
export const DraftSummonerProfiles: React.FC<DraftSummonerProfilesProps> = ({
    profiles
}) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Card width={1000} elevation='0' p={1}>
                {profiles.map(profile => (
                    <DraftSummonerProfile key={profile.summonerName} profile={profile} />
                ))}
            </Card>
        </div>
    );
}