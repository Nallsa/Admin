import { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

import { API_URL } from '../../../redux/api';
import { Container, Thumb, ThumbInfo, UploadText } from './FileInput.elements';

interface IProps {
  file?: string | null | MediaSource | Blob;
  setFile?: any;
  title?: string;
  name?: string;
}

const FileInput: React.FC<IProps> = ({ file, setFile, name, title }) => {
  /* const [files, setFiles] = useState<any>() */

  const previewImage = useMemo(() => {
    if (!file || typeof file === 'string') {
      return;
    } else {
      return URL.createObjectURL(file as MediaSource);
    }
  }, [file]);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: { 'image/*': ['.jpeg', '.png'] },
      maxFiles: 1,
      onDrop: (acceptedFiles: any) => setFile(name, acceptedFiles[0]),
    });

  const handleDeleteImg = (e: any): void => {
    setFile(name, null);
  };

  return (
    <div className='container'>
      {previewImage || typeof file === 'string' ? (
    
          <>
            <Thumb
              style={{
                backgroundImage: `url(${
                  typeof file === 'string' ? `${API_URL}/${file}` : previewImage
                })`,
              }}
            ></Thumb>
            <ThumbInfo>
              <Button
                size='small'
                variant='outlined'
                startIcon={<DeleteIcon />}
                onClick={handleDeleteImg}
              >
                Удалить
              </Button>
            </ThumbInfo>
          </>
        ) : (
          <Container
            {...getRootProps({ isFocused, isDragAccept, isDragReject })}
          >
            <input {...getInputProps()} />
            <p>{title}</p>
            <UploadText>Нажмите для загрузки</UploadText>
          </Container>
        )
      }
    </div>
  );
};

export default FileInput;
