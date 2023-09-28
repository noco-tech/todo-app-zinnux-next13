import { GetStaticProps, NextPage } from 'next'
import { supabase } from '../../utils/supabase'
import { Notice, Task } from '../../types/types'
import { Layout } from '@/components/Layout'


export const getStaticProps: GetStaticProps = async () => {
  console.log('getStaticProps/ssg invoked')
  const { data: tasks } = await supabase
    .from('todos')
    .select('*')
    .order('created_at', { ascending: true })

  const { data: notices } = await supabase
    .from('notices')
    .select('*')
    .order('created_at', { ascending: true })



  return {
    props: {
      tasks,
      notices,
    },
  }
}

type StaticProps = {
  tasks: Task[]
  notices: Notice[]
}

const Ssg: NextPage<StaticProps> = ({ tasks, notices }) => {
  return (
    <Layout title="SSG">
      <p className="mb-3 text-blue-500">ssg</p>
      <ul>
        {tasks.map((task: Task) => (
          <li key={task.id}>
            <p className="text-lg font-extrabold">{task.title}</p>
          </li>
        ))}
      </ul>

      {/* notices */}
      <ul>
        {notices.map((notice: Notice) => (
          <li key={notice.id}>
            <p className="text-lg font-extrabold">{notice.content}</p>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export default Ssg
