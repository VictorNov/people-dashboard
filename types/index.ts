export type Person = {
    Id: string;
    Name: string;
    Title: string;
    Photo: string;
    Tags?: { Name: string, Color: string, dialog?: boolean; }[];
    Attention?: { Amount: number, Color: string, dialog?: boolean; }[];
    Profit?: { Amount: number, Color: string, dialog?: boolean; }[];
}