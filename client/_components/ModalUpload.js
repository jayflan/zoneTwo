import React, { useState } from 'react';
import SecondaryButton from './styles/SecondaryButton';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure, Button, Text,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input
} from '@chakra-ui/react';
import FileUploader from './FileUploader';
import { useDispatch } from 'react-redux';
import {addUserWorkout} from '../_store/workouts';

const ModalUpload = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [name, setName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    
    const handleSubmit = (e) => {
        e.preventDefault();
        setName('');
        setSelectedFile(null);
        dispatch(addUserWorkout(name, selectedFile));
        onClose();
    }
    
    const handleCancel = (e) => {
        e.preventDefault();
        setName('');
        setSelectedFile(null);
        onClose();
    }

    //<---------- Hooks ---------->
    const dispatch = useDispatch();


    return (
        <>
            <SecondaryButton m='5' mr='10' onClick={() => onOpen() }>Upload</SecondaryButton>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>File Upload</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <FormControl>
                            <Text mt='4'>Please upload your '.gpx' file</Text>
                            <FormLabel mt='4'>Workout Name</FormLabel>
                            <Input type='text' value={name} onChange={(e)=>{setName(e.target.value)}}/>
                            <FileUploader onFileSelect={(file) => setSelectedFile(file)}/>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <SecondaryButton mr={3} disabled={!selectedFile} onClick={(e)=>{handleSubmit(e)}}>Save</SecondaryButton>
                        <Button variant='ghost' onClick={(e)=> {handleCancel(e)}}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>

    );
}



export default ModalUpload;