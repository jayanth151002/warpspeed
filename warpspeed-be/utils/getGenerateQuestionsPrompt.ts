export const getGenerateQuestionsPrompt = (bizProb: string) => {

    return `
    Business Issue: ${bizProb}

    This is the input given by an engineer regarding a business problem. You have to help him find the best cloud services to leverage. You have to generate three questions, which are atleast 50 words long to gain more context about the problem before addressing it. Do not ask any questions regarding budget. The response should be strictly in the following JSON format without any preceding number:
    {
    questions:string[]
    }
    The questions should not have preceding numbers. 
    `
}