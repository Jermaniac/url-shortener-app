export type APIUrlsResponse = {
    data:       URL[];
    page:       number;
    pageSize:   number;
    totalPages: number;
    totalCount: number;
}

export type URL = {
    _id:        string;
    long_url:   string;
    short_url:  string;
    updated_at: Date;
    __v?:       number;
}
