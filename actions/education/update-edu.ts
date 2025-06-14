'use server';

import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const educationSchema = z.object({
  id: z.string(),
  institution: z.string().min(2),
  degree: z.string().min(2),
  field: z.string().min(2),
  startDate: z.string(),
  endDate: z.string().optional(),
  description: z.string().optional(),
});

type UpdateEduFormState = {
  errors?: Record<string, string[]>;
};

export const updateEducation = async (
  _: unknown,
  formData: FormData
): Promise<UpdateEduFormState> => {
  const data = {
    id: formData.get('id') as string,
    institution: formData.get('institution') as string,
    degree: formData.get('degree') as string,
    field: formData.get('field') as string,
    startDate: formData.get('startDate') as string,
    endDate: formData.get('endDate') as string,
    description: formData.get('description') as string,
  };

  const validated = educationSchema.safeParse(data);
  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  try {
    await prisma.education.update({
      where: { id: validated.data.id },
      data: {
        institution: validated.data.institution,
        degree: validated.data.degree,
        field: validated.data.field,
        startDate: new Date(validated.data.startDate),
        endDate: validated.data.endDate ? new Date(validated.data.endDate) : null,
        description: validated.data.description || null,
      },
    });

    revalidatePath('/dashboard');
  } catch (error) {
    return { errors: { formError: ['Update failed.'] } };
  }

  return {};
};
