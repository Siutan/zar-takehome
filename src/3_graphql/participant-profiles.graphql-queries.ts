import { gql } from '@apollo/client';
import { ParticipantProfile } from './participant-profiles.graphql-types';

export interface ParticipantProfilesQueryData {
    getParticipantProfiles: ParticipantProfile[];
}

export const PARTICIPANT_PROFILES_QUERY = gql`
    query GetParticipantProfiles($input: GetParticipantProfilesInput) {        
        getParticipantProfiles(input: $input) {
            summonerName
            queueProfile {
                kda
                gamesPlayed
                winrate
                rank {
                    tier
                    division
                }
            }
            championProfile {
                kda
                gamesPlayed
                winrate
                rank {
                    tier
                    division
                }
            }
            roleProfile {
                kda
                gamesPlayed
                winrate
                rank {
                    tier
                    division
                }
        }
            
    }
`;