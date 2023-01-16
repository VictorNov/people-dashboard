import {Person} from "@/types";

export const usePersons = () => useState('persons', (): {data: Person[] | null, currentPage: number} => ({
    data: [],
    currentPage: 0,
}));
export const useSearchTerm = () => useState<string>('searchTerm', () => '');