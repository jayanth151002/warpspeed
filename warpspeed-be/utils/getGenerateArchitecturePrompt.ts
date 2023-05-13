import { ChatType } from "../types/requestBody"

const parsedChat = (chat: ChatType[]) => {
    let parsedChat = ""
    chat.forEach((chatItem, n) => {
        parsedChat += `
        
        Question ${n + 1}: ${chatItem.question}
        Answer ${n + 1}: ${chatItem.answer}
        
        `
    })
    return parsedChat
}

export const getGenerateArchitecturePrompt = (chat: ChatType[], bizIssue: string) => {
    return `
You are a cloud architecture consultant who’s gonna help me build the cloud architecture by suggesting the right cloud resources to leverage. Here is my business problem:
${bizIssue}
To help you gain more context over the problem, assume that you asked me some questions for which I have given my answers. Here are the questions and the respective answers
${parsedChat(chat)}
Now, your task is to suggest a system design for cloud infrastructure by leveraging cloud services. Feel free to choose any service from AWS. The answer should be at least 2000 words long with suitable headings and subheadings. The response should be STRICTLY in the following JSON format. 
{
title:name of the project,
introduction:string
layers:[{
name:name of layer,
services: services used for this layer[],
purpose:string,
key_features:[{
feature:string,
explanation:string which explains the feature in about 75 words
}],
}],
summary:string which has to be technically sound
}
`
}