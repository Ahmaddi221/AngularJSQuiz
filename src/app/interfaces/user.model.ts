
export interface SingleUserRequest {
    data:User,
    support:ReqresSupport

}
export interface UsersRequest {
    page:        number;
    per_page:    number;
    total:       number;
    total_pages: number;
    data:        User[];
    support:     ReqresSupport;
}

export interface User {
    id:         number;
    email:      string;
    first_name: string;
    last_name:  string;
    avatar:     string;
}

export interface ReqresSupport {
    url:  string;
    text: string;
}
