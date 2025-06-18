'use client';

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { deleteExp } from "../../../../actions/experience/delete-exp";


type DeleteButtonProps = {
  experienceId: string;
};

const DeleteExpBtn: React.FC<DeleteButtonProps> = ({ experienceId }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={() => {
        startTransition(async () => {
          await deleteExp(experienceId);
        });
      }}
    >
      <Button disabled={isPending} variant="ghost" size="sm" type="submit">
        {isPending ? 'Deleting...' : 'Delete'}
      </Button>
    </form>
  );
};

export default DeleteExpBtn;
