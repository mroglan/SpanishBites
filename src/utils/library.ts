import {Filters, initialFilters} from '../components/library/indexPage/FiltersPanel'

export const getQueryParams = (search:string, filters:Filters) => {
    let queryParams:any = {}

    if(filters.libraryItem !== 'none') queryParams.libraryItem = filters.libraryItem
    if(filters.authors.length > 0) queryParams.authors = filters.authors
    if(filters.birthDate) queryParams.birthDate = filters.birthDate
    if(filters.bite) queryParams.bite = filters.bite
    if(filters.books.length > 0) queryParams.books = filters.books
    if(filters.deathDate) queryParams.deathDate = filters.deathDate
    if(filters.genres.length > 0) queryParams.genres = filters.genres
    if(filters.timePeriods.length > 0) queryParams.timePeriods = filters.timePeriods
    if(search) queryParams.search = search

    return queryParams
}

export const getInfoFromQuery = (params) => {

    console.log('params', params)

    return {filters: {
        ...initialFilters,
        ...params,
        books: params.books ? Array(params.books) : [],
        authors: params.authors ? Array(params.authors) : [],
        genres: params.genres ? Array(params.genres) : [],
        timePeriods: params.timePeriods ? Array(params.timePeriods) : []
    }, search: params.search || ''}
}