'use server';

import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const experienceSchema = z.object({
  id: z.string(),
  company: z.string().min(2),
  position: z.string().min(2),
  startDate: z.string().refine(date => !isNaN(Date.parse(date)), {
    message: "Invalid start date",
  }),
  endDate: z.string().optional().refine(date => !date || !isNaN(Date.parse(date)), {
    message: "Invalid end date",
  }),
  description: z.string().optional(),
});

type UpdateExpFormState = {
  errors?: Record<string, string[]>;
};

export const updateExperience = async (
  _: unknown,
  formData: FormData
): Promise<UpdateExpFormState> => {
  const data = {
    id: formData.get('id') as string,
    company: formData.get('company') as string,
    position: formData.get('position') as string,
    startDate: formData.get('startDate') as string,
    endDate: formData.get('endDate') as string,
    description: formData.get('description') as string,
  };

  const validated = experienceSchema.safeParse(data);
  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  try {
    await prisma.experience.update({
      where: { id: validated.data.id },
      data: {
        company: validated.data.company,
        position: validated.data.position,
        startDate: new Date(validated.data.startDate),
        endDate: validated.data.endDate ? new Date(validated.data.endDate) : null,
        description: validated.data.description || null,
      },
    });

    revalidatePath('/dashboard/experience');
  } catch (error) {
    return { errors: { formError: ['Update failed.'] } };
  }

  return {};
};
