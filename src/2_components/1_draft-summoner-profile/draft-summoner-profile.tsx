import makeStyles from "@material-ui/core/styles/makeStyles";
import React from "react";
import { useResource } from "../../1_hooks/resource.provider";
import { Card, Typography } from "../../common/core/components";
import { Client, isChampionIdValid, isRoleValid } from "../../common/league";

// https://v4.mui.com/styles/api/#examples-2
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "row",
        // add shadow around the cards
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
        padding: theme.spacing(1),
        backgroundColor: theme.palette.elevation.e2,
        borderRadius: "8px",
    },
    box: {
        display: "flex",
        justifyContent: "space-between",
        paddingRight: theme.spacing(3),
    },
    summonerData: {
        display: "flex",
        flexDirection: "column",
        marginLeft: theme.spacing(2),
        alignItems: "flex-start",
    },
    championImg: {
        padding: theme.spacing(1),
        borderRadius: "15px",
    },
    summonerDataPrimary: {
        display: "flex",
        flexDirection: "column",
        color: theme.palette.text.primary,
    },
    summonerDataSecondary: {
        display: "flex",
        flexDirection: "column",
        color: theme.palette.text.secondary,
        fontSize: theme.typography.caption.fontSize,
    },
}));

export interface Profile {
    gamesPlayed: number;
    winrate: number;
    kda: number;
}

export interface DraftSummonerProfile {
    summonerName: string;
    gamesPlayed?: number;
    winrate?: number;

    tier?: Client.Tier;
    division?: Client.Division;

    role?: Client.Role;
    roleProfile?: Profile;

    championId?: Client.ChampionId;
    championProfile?: Profile;
}

export interface DraftSummonerProfileProps {
    profile: DraftSummonerProfile;
}

// TODO: Implement this component based on the Figma design. You should use the provided components: Card and Typography.
//       https://www.figma.com/file/0OzXZgcefj9s8aTHnACJld/Junior-React-Takehome?node-id=42%3A43
// Notes:
// - It has multiple states, each are represented as separate story in storybook
// - Use the profile data to dynamically determine what state to show
// - A profile is available if gamesPlayed is > 0
// - If winrate is >= 50, it's positive and displayed in our primary color, otherwise is negative and displayed in text primary

export const DraftSummonerProfile: React.FC<DraftSummonerProfileProps> = ({
          profile: {
              summonerName,
              winrate,
              gamesPlayed,

              tier,
              division,

              role,
              roleProfile,

              championId,
              championProfile,
          },
      }) => {
    const classes = useStyles();

    const {
        getChampionName,
        getChampionImage,
        getRoleName,
        getTierDivisionName,
    } = useResource();

    const hasRole = isRoleValid(role);
    const hasChampion = isChampionIdValid(championId);

    const hasProfile = gamesPlayed > 0;
    const winrateIsPositive = winrate >= 50;
    const roleIsPositive = roleProfile?.winrate >= 50;

    return (
        <Card width={400}>
            <div className={classes.root}>
                {/* CHAMPION IMAGE */}
                {!hasChampion && (
                    // idk where the image for no champion selected is so i just put a non-existing championId
                    <img
                        src={getChampionImage(999)}
                        alt="champion"
                        width={100}
                        height={100}
                        className={classes.championImg}
                    />
                )}
                {hasChampion && (
                    <img
                        src={getChampionImage(championId)}
                        alt={getChampionName(championId)}
                        width={100}
                        height={100}
                        className={classes.championImg}
                    />
                )}
                <div className={classes.box}>
                    {/* SUMMONER NAME */}
                    <div className={classes.summonerData}>
                        <Typography
                            variant="textMain"
                            paragraph
                            color="textSecondary"
                            weight="medium"
                            mt={0}
                            mb={0}
                        >
                            {summonerName}
                        </Typography>

                        {/* SUMMONER DATA */}
                        {hasProfile && (
                            <Typography
                                variant="textMain"
                                paragraph
                                color={winrateIsPositive ? "primary" : "textPrimary"}
                                weight="medium"
                            >
              <span>
                {Math.round((winrate + Number.EPSILON) * 100) / 100}% wr
              </span>
                                <span className={classes.summonerDataPrimary}>
                {getTierDivisionName(tier, division)}
              </span>
                                <span className={classes.summonerDataSecondary}>
                {gamesPlayed} games
              </span>
                            </Typography>
                        )}
                        {!hasProfile && (
                            <Typography
                                variant="textMain"
                                paragraph
                                color="textSecondary"
                                weight="medium"
                                mt={0}
                                mb={0}
                            >
                                No Data
                            </Typography>
                        )}
                    </div>
                    {/* SUMMONER ROLE */}
                    {hasRole && !hasChampion && (
                        <div className={classes.summonerData}>
                            <Typography
                                variant="textMain"
                                paragraph
                                color="textSecondary"
                                weight="medium"
                                mt={0}
                                mb={0}
                            >
                                {hasRole ? `as ${getRoleName(role)}` : ""}
                            </Typography>

                            {/* SUMMONER ROLE DATA */}

                            {roleProfile && (
                                <div>
                                    <Typography
                                        variant="textMain"
                                        paragraph
                                        color={roleIsPositive ? "primary" : "textPrimary"}
                                        weight="medium"
                                        mt={0}
                                        mb={0}
                                    >
                                        {Math.round((roleProfile.winrate + Number.EPSILON) * 100) /
                                            100}
                                        % wr
                                    </Typography>
                                    <Typography
                                        variant="textMain"
                                        paragraph
                                        color="textPrimary"
                                        weight="medium"
                                        mt={0}
                                        mb={0}
                                    >
                                        {Math.round((roleProfile.kda + Number.EPSILON) * 100) / 100}{" "}
                                        kda
                                    </Typography>
                                    <Typography
                                        variant="textMain"
                                        paragraph
                                        color="textSecondary"
                                        weight="medium"
                                        mt={0}
                                        mb={0}
                                        className={classes.summonerDataSecondary}
                                    >
                                        {roleProfile.gamesPlayed} games
                                    </Typography>
                                </div>
                            )}

                            {hasRole && !roleProfile && (
                                <Typography
                                    variant="textMain"
                                    paragraph
                                    color="textSecondary"
                                    weight="medium"
                                    mt={0}
                                    mb={0}
                                >
                                    no data
                                </Typography>
                            )}
                        </div>
                    )}
                    {/* SUMMONER CHAMPION */}
                    {hasChampion && hasRole && (
                        <div className={classes.summonerData}>
                            <Typography
                                variant="textMain"
                                paragraph
                                color="textSecondary"
                                weight="medium"
                                mt={0}
                                mb={0}
                            >
                                {hasChampion ? `on ${getChampionName(championId)}` : ""}
                            </Typography>
                            {championProfile && (
                                <div>
                                    <Typography
                                        variant="textMain"
                                        paragraph
                                        color={roleIsPositive ? "primary" : "textPrimary"}
                                        weight="medium"
                                        mt={0}
                                        mb={0}
                                    >
                                        {Math.round(
                                            (championProfile.winrate + Number.EPSILON) * 100
                                        ) / 100}
                                        % wr
                                    </Typography>
                                    <Typography
                                        variant="textMain"
                                        paragraph
                                        color="textPrimary"
                                        weight="medium"
                                        mt={0}
                                        mb={0}
                                    >
                                        {Math.round((championProfile.kda + Number.EPSILON) * 100) /
                                            100}{" "}
                                        kda
                                    </Typography>
                                    <Typography
                                        variant="textMain"
                                        paragraph
                                        color="textSecondary"
                                        weight="medium"
                                        mt={0}
                                        mb={0}
                                        className={classes.summonerDataSecondary}
                                    >
                                        {championProfile?.gamesPlayed} games
                                    </Typography>
                                </div>
                            )}
                            {!championProfile && (
                                <Typography
                                    variant="textMain"
                                    paragraph
                                    color="textSecondary"
                                    weight="medium"
                                    mt={0}
                                    mb={0}
                                >
                                    no data
                                </Typography>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
};
