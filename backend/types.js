// In types.js
import { z } from 'zod';

export const userinput = z.object({
    username:z.string(),
    password:z.string()
})

export const createCard = z.object({
    imgSrc: z.string(),
    imgAlt: z.string(),
    title: z.string(),
    description: z.string(),
    buttonText: z.string(),
    link: z.string()
});
