import { MatchResult } from './MatchResult';
export class LastSixResults{
    teamId : string;
    matches : MatchResult[];
    totalHomeWins : number = 0;
    totalAwayWins : number = 0;
    totalHomeDraws : number = 0;
    totalAwayDraws : number = 0;
    totalPoints : number = 0;
    totalScored : number = 0;
    totalConceded : number = 0;
}