import { z } from "zod";

const messageValidation = z.object({
  body: z.object({
    receiverId: z.string().nonempty(),
    senderId: z.string().nonempty(),
    text: z.string().nonempty().optional(),
    image: z.string().nonempty().optional(),
  }),
});

export default messageValidation;
