import {Person} from "@/types";

export const usePersons = () => useState<Person[]>('persons', () => []);
export const useSearchTerm = () => useState<string>('searchTerm', () => '');
