import { Button } from '@/components/ui/button'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Super Mario',
  description: 'Used car dealership',
}

export default function Home() {
  return (
    <div className='flex justify-center items-center'>
      <h1>Hello world</h1>
      <Button>Click me</Button>
    </div>
  )
}
