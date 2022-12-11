

export const isDevelopment = () => window.location.href.includes('localhost');


export const capitalizeFirstLetter = (paragraph: string) => {
    return paragraph.charAt(0).toUpperCase() + paragraph.slice(1)
}