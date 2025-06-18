import { Projects as ProjectType } from '@/types'
import { prisma } from '@/lib/prisma'
import { GetServerSideProps } from 'next'
type Props = {
  projects: ProjectType[]
}
export const getServerSideProps: GetServerSideProps = async () => {
  const data = await prisma.project.findMany({
    include: { techStacks: true },
  })

  const projects: ProjectType[] = data.map((p) => ({
    id: p.id,
    title: p.title,
    link: p.link,
    description: p.description,
    image: p.featuredImage,
    techStacks: p.techStacks.map((t) => ({ id: t.id, name: t.name })),
  }))

  return { props: { projects } }
}

export default Projects