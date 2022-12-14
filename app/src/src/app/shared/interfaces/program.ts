export interface IProgram {  
    _id: string,
    name: string,
    description: string,
    imageUrl: string,
    ingredients: string,
    category: string,
    likes: string[],
    owner: any,
}