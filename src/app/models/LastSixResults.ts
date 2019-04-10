import { MatchResult } from './MatchResult';
export class LastSixResults{
    teamId : string;
    matches : MatchResult[];
    totalHomeWins : number;
    totalAwayWins : number;
    totalHomeDraws : number;
    totalAwayDraws : number;
}