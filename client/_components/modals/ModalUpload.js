import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SecondaryButton from '../styles/SecondaryButton';
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
    Input,
    Flex
} from '@chakra-ui/react';
import FileUploader from '../FileUploader';
import { useDispatch } from 'react-redux';
import {addUserWorkout} from '../../_store/workouts';

const ModalUpload = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [fileName, setFileName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [saveBtnToggle, setSaveBtnToggle] = useState('on');

    const user = useSelector((state) => state.auth) || [];


    const handleSubmit = (e) => {
        e.preventDefault();

        setUploadStatus('Uploading.....')
        setSaveBtnToggle(false);
        
          //read & prep file for upload
        const reader = new FileReader();
        //Todo check that file is indeed gpx/xml and throw error if NOT
        //Todo ex. reader.readAsDataURL(selectedFile) <-- to change file into string
        reader.readAsBinaryString(selectedFile);
        
        reader.onload = async () => {

            const file = reader.result;
            //make POST inside 'reader.onload' to capture reader result
            const formData = {fileName: fileName, fileData: file};
            const userId = user.id;
            const userWorkout = (await axios.post(`api/workouts/upload/user/${userId}`, formData,
                {
                headers: {
                    'Content-Type': 'application/json'
                }
                }
            )).data;
            
            //error and shutdown
            setTimeout(() => {
                setFileName('');
                setSelectedFile(null);
                // setUploadStatus('');    
                if(userWorkout.error) {
                    setSaveBtnToggle(false);
                    setUploadStatus(userWorkout.error)
                } else if(userWorkout) {
                    setUploadStatus('Done');
                    dispatch(addUserWorkout(userWorkout));
                    setTimeout(() => {
                        console.log('Delayed for 5 seconds');
                        setUploadStatus('');
                        setSaveBtnToggle(true);
                        if(!userWorkout.error) onClose();
                    }, "1000");
                }
            }, "1000");

        }
        
    }
    
    const handleCancel = (e) => {
        e.preventDefault();
        setFileName('');
        setSelectedFile(null);
        setSaveBtnToggle('off');
        setUploadStatus('');
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
                        {uploadStatus === '' 
                            ?
                            <FormControl>
                                <Text mt='4'>Please upload your '.gpx' file</Text>
                                <FormLabel mt='4'>Workout Name</FormLabel>
                                <Input type='text' value={fileName} onChange={(e)=>{setFileName(e.target.value)}}/>
                                <FileUploader onFileSelect={(file) => setSelectedFile(file)}/>
                            </FormControl>
                            :
                            <Text>{uploadStatus}</Text>
                        }
                    </ModalBody>
                    <ModalFooter>
                        <SecondaryButton mr={3} disabled={!saveBtnToggle} onClick={(e)=>{handleSubmit(e)}}>Save</SecondaryButton>
                        <Button variant='ghost' onClick={(e)=> {handleCancel(e)}}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>

    );
}



export default ModalUpload;