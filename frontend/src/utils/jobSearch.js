const normalizeText = (value = "") => {
    return value
        .toString()
        .toLowerCase()
        .replace(/banglore/g, "bangalore")
        .replace(/full stack/g, "fullstack")
        .replace(/software development/g, "software engineer developer")
        .replace(/frontend developer/g, "frontend react ui developer")
        .replace(/fullstack developer/g, "fullstack full stack developer")
        .replace(/data science/g, "data science data analyst machine learning")
        .trim();
};

const getSalaryBucket = (salary) => {
    const amount = Number(salary);

    if (Number.isNaN(amount)) {
        return "";
    }

    if (amount >= 3 && amount <= 6) return "3-6 lpa";
    if (amount > 6 && amount <= 12) return "6-12 lpa";
    if (amount > 12 && amount <= 20) return "12-20 lpa";
    if (amount > 20) return "20+ lpa";
    return "";
};

const queryAliases = {
    "software development": ["software engineer", "software developer", "developer"],
    "frontend developer": ["frontend", "react", "ui developer"],
    "fullstack developer": ["fullstack", "full stack", "mern"],
    "data science": ["data analyst", "machine learning", "python"],
    "design": ["designer", "ui", "ux", "figma"],
    "marketing": ["digital marketing", "seo", "campaign"],
    "sales": ["business development", "account executive", "sales executive"]
};

const getExpandedQueries = (query) => {
    const normalizedQuery = normalizeText(query);
    return [normalizedQuery, ...(queryAliases[normalizedQuery] || []).map(normalizeText)];
};

export const jobMatchesQuery = (job, query) => {
    const expandedQueries = getExpandedQueries(query).filter(Boolean);

    if (expandedQueries.length === 0) {
        return true;
    }

    const searchableParts = [
        job?.title,
        job?.description,
        job?.location,
        job?.jobType,
        job?.company?.name,
        job?.company?.location,
        getSalaryBucket(job?.salary),
        ...(job?.requirements || [])
    ].map(normalizeText);

    return expandedQueries.some((currentQuery) =>
        searchableParts.some((part) => part.includes(currentQuery))
    );
};
