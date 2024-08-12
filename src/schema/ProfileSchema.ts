import {z} from 'zod'

export const ProfileSchema = z.object({
    username: z.string().min(2, 'at 2 characters are required').max(20, 'only 20 characters are allowed').regex(/^[a-zA-Z0-9]+/,'Special symbols are not allowed'),
    email: z.string().regex(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,'Invalid email address'),
})