import {
  Button,
  Center,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react'
import { getDefaultNormalizer } from '@testing-library/react'
import React, { useEffect, useRef, useState } from 'react'
import { FaGoogle } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import { Card } from '../components/Card'
import DividerWithText from '../components/DividerWithText'
import { Layout } from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'

export default function Registerpage() {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()
  const { register, signInWithGoogle } = useAuth()
// console.log(register("dexter@gmail.com", "111111111"));
  return (
    <Layout>
      <Heading textAlign='center' my={12}>
        Register
      </Heading>
      <Card maxW='md' mx='auto' mt={4}>
        <chakra.form
          onSubmit={async e => {
            e.preventDefault()
            if (!email || !password) {
              toast({
                description: 'Credentials not valid.',
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
              return
            }
            // your register logic here
            setIsSubmitting(true)
            register(email, password)
              .then(res => {console.log(res)})
              .catch(error => {
                console.log(error.message)
                toast({
                  description: error.message,
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                })
              })
              .finally(() => setIsSubmitting(false))
          }}
        >
          <Stack spacing='6'>
            <FormControl id='email'>
              <FormLabel>Email address</FormLabel>
              <Input name='email' type='email' autoComplete='email' required value={email}
              onChange={e => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id='password'>
              <FormLabel>Password</FormLabel>
              <Input
              value={password}
              onChange={e => setPassword(e.target.value)}
                name='password'
                type='password'
                autoComplete='password'
                required
              />
            </FormControl>
            <Button type='submit' colorScheme='primary' size='lg' fontSize='md' isLoading={isSubmitting}>
              Sign up
            </Button>
          </Stack>
        </chakra.form>
        <Center my={4}>
          <Button variant='link' onClick={() => history.push('/login')}>
            Login
          </Button>
        </Center>
        <DividerWithText my={6}>OR</DividerWithText>
        <Button
          variant='outline'
          isFullWidth
          colorScheme='red'
          leftIcon={<FaGoogle />}
          onClick={() => signInWithGoogle().then(res => console.log(res)).catch(error => console.log(error.message))}
        >
          Signup with Google
        </Button>
      </Card>
    </Layout>
  )
}
