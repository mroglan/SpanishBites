import {Filters, initialFilters} from '../components/library/indexPage/FiltersPanel'
import {ignoreCapsAndAccentsRegex} from './regex'
import {ClientPassage, ClientUnpopulatedAuthor, ClientUnpopulatedBook} from '../database/dbInterfaces'
import {LibraryItems} from '../pages/library/index'

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


function searchThruAuthors(authors:ClientUnpopulatedAuthor[], search:string, filters:Filters) {
    return authors.filter(({firstName, lastName, timePeriod, birthDate, deathDate}) => {
        if(!`${firstName} ${lastName}`.match(ignoreCapsAndAccentsRegex(search))) return false
        if(filters.timePeriods.length > 0 && !filters.timePeriods.includes(timePeriod)) return false
        if(filters.birthDate && filters.birthDate !== birthDate) return false
        if(filters.deathDate && filters.deathDate !== deathDate) return false
        return true
    }).map(author => ({...author, type: 'author'}))
}

function searchThruBooks(books:ClientUnpopulatedBook[], search:string, filters:Filters) {
    return books.filter(({title, timePeriod, authors, genres}) => {
        if(!title.match(ignoreCapsAndAccentsRegex(search))) return false
        if(filters.timePeriods.length > 0 && !filters.timePeriods.includes(timePeriod)) return false
        if(filters.authors.length > 0 && !filters.authors.find(author => authors.includes(author))) return false
        if(filters.genres.length > 0 && !filters.genres.find(genre => genres.includes(genre))) return false
        return true
    }).map(book => ({...book, type: 'book'}))
}

function searchThruPassages(passages:ClientPassage[], search:string, filters:Filters) {
    return passages.filter(({name, book}) => {
        if(!name.match(ignoreCapsAndAccentsRegex(search))) return false
        if(filters.books.length > 0 && !filters.books.includes(book ? book._id : '')) return false
        if(filters.timePeriods.length > 0 && !filters.timePeriods.includes(book.timePeriod)) return false
        if(filters.authors.length > 0 && !filters.authors.find(author => book.authors.includes(author))) return false
        if(filters.genres.length > 0 && !filters.genres.find(genre => book.genres.includes(genre))) return false
        return true
    }).map(passage => ({...passage, type: 'passage'}))
}

function searchThruAllItems(libraryItems:LibraryItems, search:string, filters:Filters) {
    const items = [];
    items.push(...searchThruAuthors(libraryItems.authors, search, filters))
    items.push(...searchThruBooks(libraryItems.books, search, filters))
    items.push(...searchThruPassages(libraryItems.passages, search, filters))
    return items
}

export function findDisplayItems(libraryItems:LibraryItems, search:string, filters:Filters) {
    const {libraryItem:searchItem} = filters
    const lcSearch = search.toLowerCase()
    if(searchItem === 'none') return searchThruAllItems(libraryItems, lcSearch, filters)
    if(searchItem === 'authors') return searchThruAuthors(libraryItems.authors, lcSearch, filters)
    if(searchItem === 'books') return searchThruBooks(libraryItems.books, lcSearch, filters)
    return searchThruPassages(libraryItems.passages, lcSearch, filters)
}


function getListItemInfoForPassage(item:ClientPassage&{type:string}) {
    return {
        title: item.name,
        subtitle: item.book?.title,
        image: item.book?.image,
        link: {
            href: '/library/passages/[id]',
            as: `/library/passages/${item._id}`
        }
    }
}

function getListInfoForBook(item:ClientUnpopulatedBook&{type:string}, authors:ClientUnpopulatedAuthor[]) {
    return {
        title: item.title,
        subtitle: item.authors.map(author => authors.find(a => a._id === author)).map(a => `${a.firstName} ${a.lastName}`).join(', '),
        image: item.image,
        link: {
            href: '/library/books/[id]',
            as: `/library/books/${item._id}`
        }
    }
}

function getListInfoForAuthor(item:ClientUnpopulatedAuthor&{type:string}) {
    return {
        title: `${item.firstName} ${item.lastName}`,
        subtitle: `${item.birthDate} - ${item.deathDate}`,
        image: item.image,
        link: {
            href: '/library/authors/[id]',
            as: `/library/authors/${item._id}`
        }
    }
}

export function getListItemInfo(items, authors:ClientUnpopulatedAuthor[]) {
    return items.map(item => item.type === 'author' ? getListInfoForAuthor(item) : item.type === 'book' ? getListInfoForBook(item, authors) :
    getListItemInfoForPassage(item))
}