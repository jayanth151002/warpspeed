export const getGenerateArchitecturePrompt = (input: string) => {
    return `
    Extract a rough overview and key technical 5 points which are not more than 20 words long from this data containing the overview and some important question answers about the requirement: ${input}.
    `
}