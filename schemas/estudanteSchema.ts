import { z } from "zod"

export const estudanteValidationSchema = z.object({
    email: z.string().email('Email Inválido'),
})