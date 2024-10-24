'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { User, UserProfile } from '@prisma/client'
import { createAuthControl } from '@/controls/services/authService'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/navigation'
import Error from 'next/error'

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First name is required',
  }),
  lastName: z.string().min(2, {
    message: 'First name is required',
  }),
  email: z.string().email({
    message: 'Invalid email address',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters long',
  }),
})

export default function SignupForm() {
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const user: User = {
      email: values.email,
      password: values.password,
      id: uuidv4(),
      updatedAt: new Date(),
      createdAt: new Date(),
    }

    const profile: UserProfile = {
      firstName: values.firstName,
      lastName: values.lastName,
      userId: user.id,
      id: uuidv4(),
      updatedAt: new Date(),
      createdAt: new Date(),
      imageUrl: '',
      role: ['buyer'],
    }

    const authControl = createAuthControl()

    try {
      authControl.createUserAccountController(user, profile).then((success) => {
        if (!success) {
          console.log('Failed to create user: ', 'User already exists')
        } else {
          console.log('User created successfully')
          router.push('/auth/login')
          form.reset()
        }
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Failed to create user:', error.context)
      }
    }
  }

  return (
    <div className='w-[300px]'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder='firstName' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder='lastName' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='email' type='email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder='password' type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  )
}
