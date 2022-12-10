export interface IProgram {  
    _id: string,
    name: string,
    description: string,
    image: string,
    ingredients: string,
    category: string,
    likes: string[],
    owner: any,
}