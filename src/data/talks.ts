import cv from '../content/cv.json';

// Talks given more than once share a single entry listing every occurrence
export const talks = cv.talks.reduce((groups, talk) => {
    const group = groups.find(g => g.title === talk.title);
    if (group) group.occurrences.push(talk);
    else groups.push({ title: talk.title, occurrences: [talk] });
    return groups;
}, [] as { title: string; occurrences: typeof cv.talks }[]);
