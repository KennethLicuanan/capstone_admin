import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonButton, 
  IonBackButton,
  IonCard, 
  IonInput, 
  IonItem, 
  IonList, 
  IonIcon, 
  IonTextarea,
  IonModal,
  IonActionSheet,
  IonSelect,
  IonSelectOption
} from '@ionic/react';
import { addCircle } from 'ionicons/icons';
import Tesseract from 'tesseract.js';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useState, useRef } from 'react';
import './add.css';

const Add: React.FC = () => {
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [currentInputId, setCurrentInputId] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string>('');
  const [identifierOptions, setIdentifierOptions] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleCapture = (inputId: string) => {
    setCurrentInputId(inputId);
    setShowActionSheet(true);
  };

  const handleSelectImage = async (inputId: string) => {
    const inputElement = document.getElementById(inputId) as HTMLInputElement;

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = async (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const text = await performOCR(file);
        if (inputElement) {
          inputElement.value = text;
        }
      }
    };

    fileInput.click();
  };

  const handleOpenCamera = async () => {
    if (isMobile()) {
      try {
        const photo = await Camera.getPhoto({
          resultType: CameraResultType.Uri,
          source: CameraSource.Camera,
          quality: 90,
        });

        if (photo.webPath) {
          const imageUrl = photo.webPath;
          const image = await fetch(imageUrl);
          const blob = await image.blob();
          const text = await performOCR(blob);
          const inputElement = document.getElementById(currentInputId!) as HTMLInputElement;
          if (inputElement) {
            inputElement.value = text;
          }
        }
      } catch (error) {
        console.error('Error capturing image with Capacitor Camera:', error);
      }
    } else {
      setIsCameraOpen(true);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    }
  };

  const handleCaptureImage = async () => {
    if (videoRef.current && canvasRef.current) {
      const inputElement = document.getElementById(currentInputId!) as HTMLInputElement;
      const context = canvasRef.current.getContext('2d');

      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const imageDataUrl = canvasRef.current.toDataURL('image/png');
        const text = await performOCRFromDataUrl(imageDataUrl);
        if (inputElement) {
          inputElement.value = text;
        }
        stopCamera();
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOpen(false);
  };

  const preprocessImage = async (dataUrl: string): Promise<HTMLCanvasElement> => {
    const image = new Image();
    image.src = dataUrl;
    return new Promise((resolve) => {
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (context) {
          canvas.width = image.width;
          canvas.height = image.height;
          context.drawImage(image, 0, 0);
          
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            const threshold = avg > 128 ? 255 : 0;
            data[i] = threshold;
            data[i + 1] = threshold;
            data[i + 2] = threshold;
          }

          context.putImageData(imageData, 0, 0);
          resolve(canvas);
        }
      };
    });
  };

  const performOCRFromDataUrl = async (dataUrl: string): Promise<string> => {
    try {
      const canvas = await preprocessImage(dataUrl);
      const { data: { text } } = await Tesseract.recognize(
        canvas.toDataURL(),
        'eng',
        {
          oem: 1 as any,
        } as any
      );
      console.log('OCR Result:', text);
      return text;
    } catch (error) {
      console.error('Error during OCR:', error);
      return 'Error capturing text';
    }
  };

  const performOCR = async (file: File | Blob): Promise<string> => {
    try {
      const { data: { text } } = await Tesseract.recognize(
        file,
        'eng',
        {
          oem: 1 as any,
        } as any
      );
      console.log('OCR Result:', text);
      return text;
    } catch (error) {
      console.error('Error during OCR:', error);
      return 'Error capturing text';
    }
  };

  const isMobile = () => {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  };

  const handleProgramChange = (event: CustomEvent) => {
    const program = (event.detail.value as string);
    setSelectedProgram(program);

    // Update identifier options based on the selected program
    switch (program) {
      case 'BSIT':
        setIdentifierOptions(['WEB-BASED', 'WEB-APP', 'MOBILE APP', 'IOT']);
        break;
      case 'TEP':
        setIdentifierOptions(['BEED', 'BSED', 'BECE']);
        break;
      case 'BSBA':
        setIdentifierOptions(['MM', 'FM', 'OM']);
        break;
      default:
        setIdentifierOptions([]);
    }
  };

  const handleSubmit = async () => {
    const title = (document.getElementById('titleInput') as HTMLTextAreaElement).value;
    const author = (document.getElementById('authorsInput') as HTMLTextAreaElement).value;
    const abstract = (document.getElementById('abstractInput') as HTMLTextAreaElement).value;
    const keywords = (document.getElementById('tagsInput') as HTMLTextAreaElement).value;
    const year = (document.getElementById('yearInput') as HTMLInputElement).value;
    const identifier = (document.getElementById('identifierSelect') as HTMLSelectElement).value;
    const type = (document.getElementById('typeSelect') as HTMLSelectElement).value;

    console.log({ title, author, abstract, keywords, year, identifier, type });

    try {
      const response = await fetch('http://localhost:3000/add-study', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, author, abstract, keywords, year, identifier, type }),
      });

      if (response.ok) {
        alert('Study added successfully!');
        // Clear the input fields after successful addition
        (document.getElementById('titleInput') as HTMLTextAreaElement).value = '';
        (document.getElementById('authorsInput') as HTMLTextAreaElement).value = '';
        (document.getElementById('abstractInput') as HTMLTextAreaElement).value = '';
        (document.getElementById('tagsInput') as HTMLTextAreaElement).value = '';
        (document.getElementById('yearInput') as HTMLInputElement).value = '';
        (document.getElementById('identifierSelect') as HTMLSelectElement).value = '';
        (document.getElementById('typeSelect') as HTMLSelectElement).value = '';
      } else {
        const errorText = await response.text(); // Get the response text to display
        console.error('Server Error:', errorText);
        alert(`Failed to add study: ${errorText}`);
      }
    } catch (error) {
      console.error('Error adding study:', error);
      alert('An error occurred while adding the study.');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonBackButton className='back' defaultHref="/" />
          <IonTitle>Home</IonTitle><br />
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <div className="container">
          <div className="logo">
            <img src="src/assets/book.png" height="150" alt="logo" />
            <h1>DIGI-BOOKS <br /> ADD STUDY</h1>
          </div>
        </div>

        <IonCard ><br />
          <IonList className='ionlist'>
            <IonItem >
              <IonTextarea id="titleInput" label="TITLE: " autoGrow={true} ></IonTextarea>
              <IonIcon icon={addCircle} slot="end" onClick={() => handleCapture('titleInput')} />
            </IonItem>

            <IonItem >
              <IonTextarea id="authorsInput" label="AUTHORS: " autoGrow={true} ></IonTextarea>
              <IonIcon icon={addCircle} slot="end" onClick={() => handleCapture('authorsInput')} />
            </IonItem>

            <IonItem >
              <IonTextarea id="abstractInput" label="ABSTRACT: " autoGrow={true}></IonTextarea>
              <IonIcon icon={addCircle} slot="end" onClick={() => handleCapture('abstractInput')} />
            </IonItem>

            <IonItem >
              <IonTextarea id="tagsInput" label="TAGS/KEYWORDS: " autoGrow={true} ></IonTextarea>
              <IonIcon icon={addCircle} slot="end" onClick={() => handleCapture('tagsInput')} />
            </IonItem>

            <IonItem >
              <IonInput id="yearInput" label="YEAR: "></IonInput>
            </IonItem>

            <IonItem>
              <IonSelect id="typeSelect" placeholder="Select Program" onIonChange={handleProgramChange}>
                <IonSelectOption value="BSIT">BSIT</IonSelectOption>
                <IonSelectOption value="BSBA">BSBA</IonSelectOption>
                <IonSelectOption value="TEP">TEP</IonSelectOption>
                {/* Add more options as needed */}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonSelect id="identifierSelect" placeholder="Select Identifier">
                {identifierOptions.map((option, index) => (
                  <IonSelectOption key={index} value={option}>{option}</IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            
            <br />
            <IonButton color={'dark'} className='add' onClick={handleSubmit}>ADD</IonButton><br />
            <br />
          </IonList>
        </IonCard>

        <IonModal isOpen={isCameraOpen} onDidDismiss={() => setIsCameraOpen(false)}>
          <video ref={videoRef} width="100%" height="300" autoPlay></video>
          <IonButton color="primary" onClick={handleCaptureImage}>Capture Image</IonButton>
          <IonButton color="danger" onClick={stopCamera}>Close Camera</IonButton>
          <canvas ref={canvasRef} style={{ display: 'none' }} width="400" height="300"></canvas>
        </IonModal>

        <IonActionSheet
          isOpen={showActionSheet}
          onDidDismiss={() => setShowActionSheet(false)}
          buttons={[
            {
              text: 'Select Image',
              handler: () => {
                if (currentInputId) handleSelectImage(currentInputId);
              },
            },
            {
              text: 'Open Camera',
              handler: () => {
                handleOpenCamera();
              },
            },
            {
              text: 'Cancel',
              role: 'cancel',
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Add;
