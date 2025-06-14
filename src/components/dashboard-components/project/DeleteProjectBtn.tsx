'use client';

import { useTransition } from "react";
import { deleteProject } from "../../../../actions/project/deleteproject";
import { Button } from "../../ui/button";

type DeleteButtonProps = {
  projectId: string;
};

const DeleteProjectBtn: React.FC<DeleteButtonProps> = ({ projectId }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={() => {
        startTransition(async () => {
          await deleteProject(projectId);
        });
      }}
    >
      <Button disabled={isPending} variant="ghost" size="sm" type="submit">
        {isPending ? 'Deleting...' : 'Delete'}
      </Button>
    </form>
  );
};

export default DeleteProjectBtn;
