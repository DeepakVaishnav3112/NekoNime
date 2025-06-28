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
                    media(genre: $genre, type: ANIME, sort: POPULARITY_DESC) {
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
  variables: {},
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

const animeDetailsQuery = {
  query: `
      query ($id: Int) {
        Media(id: $id, type: ANIME) {
          id
          idMal
          title {
            romaji
            english
          }
          coverImage {
            extraLarge
          }
          bannerImage
          trailer {
            id
            site
            thumbnail
          }
          description(asHtml: false)
          averageScore
          popularity
          format
          episodes
          duration
          genres
          source
          status
          startDate {
            year
            month
            day
          }
          season
          seasonYear
        }
      }
    `,
  variables: {},
};

const animeCharacterQuery = {
  query: `
    query ($id: Int, $page: Int) {
      Media(id: $id, type: ANIME) {
        characters(perPage: 20, page: $page, sort: [ROLE, FAVOURITES_DESC]) {
          pageInfo {
            total
            currentPage
            hasNextPage
          }
          edges {
            role
            node {
              id
              name {
                full
                native
              }
              image {
                large
              }
              gender
              age
              description(asHtml: false)
              dateOfBirth {
                year
                month
                day
              }
            }
            voiceActors {
              id
              name {
                full
                native
              }
              language
              image {
                large
              }
            }
          }
        }
      }
    }
  `,
  variables: {},
};

const animeStaffQuery = {
  query: `
    query ($id: Int, $page: Int) {
      Media(id: $id, type: ANIME) {
        staff(perPage: 20, page: $page, sort: [ROLE_DESC]) {
          pageInfo {
            total
            currentPage
            hasNextPage
          }
          edges {
            role
            node {
            id
            name {
              full
              native
            }
            image {
              large
            }
          }
        }
      }
    }
  }
  `,
  variables: {},
}

const animeMoreInfoQuery = {
  query: `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id
        status
        source
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        nextAiringEpisode {
          episode
          airingAt
        }
        favourites
        studios(isMain: true) {
          nodes {
            name
          }
        }
        rankings {
          id
          rank
          type
          format
          allTime
        }
        tags {
          name
          rank
          isMediaSpoiler
          description
        }
        externalLinks {
          site
          url
          type
          color
        }
        hashtag
        siteUrl
        updatedAt
        isAdult
        countryOfOrigin
      }
    }
  `,
  variables: {}
};

module.exports = {
  trendingAnimeQuery,
  animeQuery,
  animeGenreQuery,
  upcomingAnimeQuery,
  latestAnimeQuery,
  animeSearchQuery,
  animeDetailsQuery,
  animeCharacterQuery,
  animeStaffQuery,
  animeMoreInfoQuery,
};
