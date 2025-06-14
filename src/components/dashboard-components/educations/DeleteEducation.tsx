'use client';

import { useTransition } from "react";
import { deleteEdu } from "../../../../actions/education/deleteEdu";
import { Button } from "@/components/ui/button";


type DeleteButtonProps = {
  educationId: string;
};

const DeleteEduBtn: React.FC<DeleteButtonProps> = ({ educationId }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={() => {
        startTransition(async () => {
          await deleteEdu(educationId);
        });
      }}
    >
      <Button disabled={isPending} variant="ghost" size="sm" type="submit">
        {isPending ? 'Deleting...' : 'Delete'}
      </Button>
    </form>
  );
};

export default DeleteEduBtn;
