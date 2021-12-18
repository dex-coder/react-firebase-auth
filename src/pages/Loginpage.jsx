import {
  Button,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  useToast,
  Text,
  Box,
  Flex,
} from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { FaGoogle } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'
import { Link, useHistory } from 'react-router-dom'
import { Card } from '../components/Card'
import DividerWithText from '../components/DividerWithText'
import { Layout } from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import useMounted from '../hooks/useMounted'

export default function Loginpage() {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()
  const { login, signInWithGoogle } = useAuth()
  const mounted = useMounted()
  const location = useLocation()

  return (
    <Layout>
      <Heading textAlign='center' my={12}>
        Login
      </Heading>
      <Card maxW='md' mx='auto' mt={4}>
        <chakra.form
          onSubmit={async e => {
            e.preventDefault()
            // your login logic here
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
            login(email, password)
              .then(res => {
                console.log(res)
                //we will use optional chaning if the location is defined we will use the location state if it's not then the default link
                history.push(location.state?.from ?? '/profile')
              })
              .catch(error => {
                console.log(error.message)
                toast({
                  description: error.message,
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                })
              })
              .finally(() => mounted.current && setIsSubmitting(false))
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
                name='password'
                type='password'
                autoComplete='password'
                required
                value={password}
              onChange={e => setPassword(e.target.value)}
              />
            </FormControl>
            {/* <PasswordField /> */}
            <Button type='submit' colorScheme='primary' size='lg' fontSize='md'>
              Sign in
            </Button>
          </Stack>
        </chakra.form>
        <HStack justifyContent='space-between' my={4}>
          <Button variant='link'>
            <Link to='/forgot-password'>Forgot password?</Link>
          </Button>
          <Button variant='link' onClick={() => history.push('/register')}>
            Register
          </Button>
        </HStack>
        <DividerWithText my={6}>OR</DividerWithText>
        <Button
          variant='outline'
          isFullWidth
          colorScheme='red'
          leftIcon={<FaGoogle />}
          onClick={() => signInWithGoogle().then(res => console.log(res)).catch(error => console.log(error.message))}
        >
          Sign in with Google
        </Button>
      </Card>
    </Layout>
  )
}
