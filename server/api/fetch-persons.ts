import {Person} from "@/types";

export default defineEventHandler(async (event): Promise<Person[]> => {
    const runtimeConfig = useRuntimeConfig();
    const query = getQuery(event);

    const persons: Person[] = await $fetch(runtimeConfig.backendApi + 'people', {
        query: { pp: 8, p: query.page }
    });

    persons.forEach((person: Person) => {
        person.Tags = person.Tags?.map((tag) => {
            tag.dialog = false;
            if (!tag.Color.startsWith('#')) tag.Color = '#' + tag.Color;
            return tag;
        });
        person.Attention = person.Attention?.map((attention) => {
            attention.dialog = false;
            if (!attention.Color.startsWith('#')) attention.Color = '#' + attention.Color;
            return attention;
        });
        person.Profit = person.Profit?.map((profit) => {
            profit.dialog = false;
            if (!profit.Color.startsWith('#')) profit.Color = '#' + profit.Color;
            return profit;
        });
    });

    return persons;
})