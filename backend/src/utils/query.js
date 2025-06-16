const animeQuery = {
  query: `
            query {
                Page(page: 1, perPage: 20) {
                    media(type: ANIME, sort: POPULARITY_DESC) {
                        id 
                        title {
                            romaji
                            english
                        }
                        coverImage {
                            large
                        }
                        description(asHtml: false)
                        genres
                        averageScore
                        format
                        episodes
                    }
                }
            }
        `,
};

const animeGenreQuery = {
  query: `
            query ($genre: String) {
                Page(page: 1, perPage: 20) {
                    media(genre: $genre, type: ANIME, sort: TRENDING_DESC) {
                        id 
                        title {
                            romaji
                            english
                        }
                        coverImage {
                            large
                        }
                        startDate {
                            year
                            month
                            day
                        }
                        status
                        description(asHtml: false)
                        genres
                        averageScore
                        format
                        episodes
                    }
                }
            }
        `,
  variables: {},
};

const trendingAnimeQuery = {
  query: `
        query ($page: Int) {
            Page(perPage: 20, page: $page) {
                media(type: ANIME, sort: TRENDING_DESC) {
                    id
                    title {
                        romaji
                        english
                    }
                    coverImage {
                        large
                    }
                    startDate {
                    year
                    month
                    day
                    }
                    description(asHtml: false)
                    genres
                    averageScore
                    format
                    episodes
                }
            }
        }
    `,
    variables: {}
};

const upcomingAnimeQuery = {
  query: `
  query ($season: MediaSeason, $seasonYear: Int) {
        Page(page: 1, perPage: 20) {
            media(type: ANIME, season: $season, seasonYear: $seasonYear ,sort: POPULARITY_DESC) {
                id 
                title {
                    romaji
                    english
                }
                coverImage {
                    large
                }
                startDate {
                    year
                    month
                    day
                }
                description(asHtml: false)
                genres
                averageScore
                format
                episodes
            }
        }
}
    `,
  variables: {},
};

const latestAnimeQuery = {
  query: `
  query {
        Page(page: 1, perPage: 20) {
            media(type: ANIME, status_in: RELEASING, sort: START_DATE_DESC) {
                id 
                title {
                    romaji
                    english
                }
                coverImage {
                    large
                }
                startDate {
                    year
                    month
                    day
                }
                status
                description(asHtml: false)
                genres
                averageScore
                format
                episodes
            }
        }
}
`,
};

const animeSearchQuery = {
  query: `
      query ($search: String) {
        Page(page: 1, perPage: 20) {
          media(type: ANIME, search: $search, sort: POPULARITY_DESC) {
            id
            title {
              romaji
              english
            }
            coverImage {
              large
            }
            description(asHtml: false)
            genres
            status
            averageScore
            format
            episodes
            startDate {
              year
              month
              day
            }
          }
        }
      }
    `,
  variables: {},
};

module.exports = {
  trendingAnimeQuery,
  animeQuery,
  animeGenreQuery,
  upcomingAnimeQuery,
  latestAnimeQuery,
  animeSearchQuery,
};
