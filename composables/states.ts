import {Person} from "@/types";
import {User} from "@firebase/auth";

export const usePersons = () => useState('persons', (): {data: Person[] | null, currentPage: number} => ({
    data: [],
    currentPage: 0,
}));
export const useSearchTerm = () => useState<string>('searchTerm', () => '');
export const useFirebaseUser = () => useState<User | null>('firebaseUser');