export type Person = {
    Id: string;
    Name: string;
    Title: string;
    Photo: string;
    Tags?: { Name: string, Color: string }[];
    Attention?: { Amount: number, Color: string }[];
    Profit?: { Amount: number, Color: string }[];
}