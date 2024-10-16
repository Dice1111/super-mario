import { createAuthControl } from '@/controls/services/authService'

export default async function Home() {
  const authControl = createAuthControl()
  authControl.checkUser()
  return (
    <div>
      <h1>Home page</h1>
    </div>
  )
}
