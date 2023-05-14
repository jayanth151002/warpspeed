export const getIteratedArchitecturePrompt = (bizProb: string, recentArchitecture: string, constraint:string) => {
    return `
    Here is the business problem: ${bizProb}. You are a cloud architect and you have been asked to design a system to solve this problem.
    Here is the architecture you have designed: ${recentArchitecture}. Now, you have been told that the system must have the following constraint: ${constraint}.
    Please update the architecture to meet this constraint.
    `
}