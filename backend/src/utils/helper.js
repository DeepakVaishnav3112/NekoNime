const getNextSeasonAndYear = () => {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    const seasons = ["WINTER", "SPRING", "SUMMER", "FALL"];
    const currentSeasonIdx = Math.floor(month / 3);
    const nextSeasonIdx = (currentSeasonIdx + 1) % 4;
    const nextYear = nextSeasonIdx === 0 ? year + 1 : year;

    return { 
        season: seasons[nextSeasonIdx],
        year: nextYear
    };
};

module.exports = {
    getNextSeasonAndYear
};