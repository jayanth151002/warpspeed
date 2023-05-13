export interface ChatType {
    question: string,
    answer: string
}

export interface RequestBody {
    chat: ChatType[],
    bizIssue: string
}