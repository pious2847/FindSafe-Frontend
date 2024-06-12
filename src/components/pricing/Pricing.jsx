import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react'
import { Button } from "@/components/ui/button"
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

import PropTypes from 'prop-types';

function PriceWrapper(props) {
  const { children } = props;

  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: 'center', lg: 'flex-start' }}
      borderColor={useColorModeValue('gray.200', 'gray.500')}
      borderRadius={'xl'}>
      {children}
    </Box>
  );
}

PriceWrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };


export default function ThreeTierPricing() {
  return (
    <Box py={12} className='w-full flex justify-evenly flex-col' >
      <VStack spacing={2} textAlign="center">
        <Heading as="h1"  className='text-4xl '>
          Plans that fit your need
        </Heading>
        <Text  className='text-lg text-slate-400'>
          Start with 14-day free trial. No credit card needed. Cancel at anytime.
        </Text>
      </VStack>

      <Stack
        direction={{ base: 'column', md: 'row' }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        className='flex gap-14 py-10 flex-wrap'
        >
        <PriceWrapper className='border-x-0 rounded-xl overflow-hidden '>
          <Box className='py-5' px={12}>
            <Text  className='font-extrabold text-2xl'>
              Free
            </Text>
            <HStack justifyContent="center" className='h-28'>
              <Text  className='font-extrabold text-3xl'>
                $
              </Text>
              <Text className='font-extrabold text-5xl'>
                0
              </Text>
              <Text className='font-extrabold text-3xl'>
                /month
              </Text>
            </HStack>
          </Box>
          <VStack
            bg={useColorModeValue('gray.50', 'gray.700')}
            className='bg-slate-600 w-72 min-h-60 p-4  justify-between'
            py={4}
            borderBottomRadius={'xl'}>
            <List spacing={3} textAlign="start" px={12} className='px-10 gap-5 flex flex-col items-start  '  >
            <ListItem className='flex gap-3 items-center '>
                <ListIcon as={FaCheckCircle}  style={{color: '#38a169'}}  />
                Unlimited build minutes
              </ListItem>
              <ListItem className='flex gap-3 items-center justify-center'>
                <ListIcon as={FaCheckCircle}  style={{color: '#38a169'}}  />
                2 user Accounts.
              </ListItem>
              <ListItem className='flex gap-3 items-center justify-center'>
                <ListIcon as={FaCheckCircle}  style={{color: '#38a169'}}  />
                500MB File Storage .
              </ListItem>
              <ListItem className='flex gap-3 items-center justify-center'>
                <ListIcon as={FaTimesCircle}  style={{color: '#ef4444'}}  />
                Color and Ui Customization.
              </ListItem>
            </List>
            <Box w="80%" pt={7}>
              <Button className='w-full ' colorScheme="red" variant="outline" >
                Start trial
              </Button>
            </Box>
          </VStack>
        </PriceWrapper>

        <PriceWrapper>
          <Box position="relative">
            <Box
              position="absolute"
              top="-16px"
              left="50%"
              style={{ transform: 'translate(-50%)' }}>
              <Text
                textTransform="uppercase"
                className='px-3 bg-red-500 py-1  text-sm rounded-xl '
                color={useColorModeValue('gray.900', 'gray.300')}
                >
                Most Popular
              </Text>
            </Box>
            <Box className='py-5 px-10' px={12}>
            <Text  className='font-extrabold text-2xl'>
            Premium
            </Text>
            <HStack justifyContent="center" className='h-28'>
              <Text  className='font-extrabold text-3xl'>
                $
              </Text>
              <Text className='font-extrabold text-5xl'>
                579
              </Text>
              <Text className='font-extrabold text-3xl'>
                /month
              </Text>
            </HStack>
          </Box>
            <VStack
              bg={useColorModeValue('gray.50', 'gray.700')}
            className='bg-slate-600 w-72  min-h-60  p-4  justify-between'
              py={4}
              borderBottomRadius={'xl'}>
              <List spacing={3} textAlign="start" px={12} className='px-10 gap-5 flex flex-col items-start  '  >
              <ListItem className='flex gap-3 items-center '>
                <ListIcon as={FaCheckCircle}  style={{color: '#38a169'}}  />
                Unlimited build minutes
              </ListItem>
              <ListItem className='flex gap-3 items-center justify-center'>
                <ListIcon as={FaCheckCircle}  style={{color: '#38a169'}}  />
                unlimited user Accounts.
              </ListItem>
              <ListItem className='flex gap-3 items-center justify-center'>
                <ListIcon as={FaCheckCircle}  style={{color: '#38a169'}}  />
                50GB File Storage .
              </ListItem>
              <ListItem className='flex gap-3 items-center justify-center'>
                <ListIcon as={FaCheckCircle}  style={{color: '#38a169'}}  />
                Color and Ui Customization.
              </ListItem>
            </List>
            <Box w="80%" pt={7}>
              <Button className='w-full neon z-0 ' colorScheme="red" variant="outline">
                Start trial
              </Button>
            </Box>
            </VStack>
          </Box>
        </PriceWrapper>

        <PriceWrapper >
          <Box className='py-5' px={12}>
            <Text  className='font-extrabold text-2xl'>
              Scale
            </Text>
            <HStack justifyContent="center" className='h-28'>
              <Text  className='font-extrabold text-3xl'>
                $
              </Text>
              <Text className='font-extrabold text-5xl'>
                349
              </Text>
              <Text className='font-extrabold text-3xl'>
                /month
              </Text>
            </HStack>
          </Box>
          <VStack
            bg={useColorModeValue('gray.50', 'gray.700')}
            className='bg-slate-600 w-72 min-h-60  p-4  justify-between'
            py={4}
            borderBottomRadius={'xl'}>
            <List spacing={3} textAlign="start" px={12} className='px-10 gap-5 flex flex-col items-start  '  >
            <ListItem className='flex gap-3 items-center '>
                <ListIcon as={FaCheckCircle}  style={{color: '#38a169'}}  />
                Unlimited build minutes
              </ListItem>
              <ListItem className='flex gap-3 items-center justify-center'>
                <ListIcon as={FaCheckCircle}  style={{color: '#38a169'}}  />
                30 user Accounts.
              </ListItem>
              <ListItem className='flex gap-3 items-center justify-center'>
                <ListIcon as={FaCheckCircle}  style={{color: '#38a169'}}  />
                30GB File Storage .
              </ListItem>
              <ListItem className='flex gap-3 items-center justify-center'>
                <ListIcon as={FaCheckCircle}  style={{color: '#38a169'}}  />
                Color and Ui Customization.
              </ListItem>
            </List>
            <Box w="80%" pt={7}>
              <Button className='w-full' colorScheme="red" variant="outline">
                Start trial
              </Button>
            </Box>
          </VStack>
        </PriceWrapper>
      </Stack>
    </Box>
  )
}