import React, { useRef, useState } from "react";
import { Box, Button, Flex, FormControl, Input, Text } from '@chakra-ui/react';

const FileUploader = ({onFileSelect}) => {
  const fileInput = useRef(null);
  const [fileNameDisplay, setFileNameDisplay] = useState('');
  
  const handleFileInput = async (e) => {
    //handle validations
        //Todo check selectedFile for '.gpx' ext, throw error if NOT
    // if(file.size > 1024)
      // onFileSelectError({error: "File cannot exceed more than 1MB"});
    const file = e.target.files[0]
    setFileNameDisplay(file.name);
    onFileSelect(file);
  }

  return (
    <div id="file-uploader">
      <input ref={fileInput} hidden={true} type='file' onChange={handleFileInput}/>
      <Flex direction='row' alignItems='center'>
        <Button mt='4' colorScheme='gray' onClick={(e) => {fileInput.current && fileInput.current.click()}}>Select File</Button>
        <Text p='4' mt='4'>{fileNameDisplay}</Text>
      </Flex>
    </div>
  )
}

export default FileUploader;