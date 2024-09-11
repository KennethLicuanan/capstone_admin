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
  IonIcon 
} from '@ionic/react';
import { camera } from 'ionicons/icons'; // Import the camera icon
import Tesseract from 'tesseract.js'; // Import Tesseract.js for OCR
import './add.css';

const Add: React.FC = () => {

  // Function to handle capturing an image from the user
  const handleCapture = (inputId: string) => {
    const inputElement = document.getElementById(inputId) as HTMLInputElement;

    // Create an input element to select an image file
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = async (event: any) => {
      const file = event.target.files[0];
      if (file) {
        // Perform OCR on the selected image file
        const text = await performOCR(file);
        if (inputElement) {
          inputElement.value = text; // Set captured text to the input field
        }
      }
    };

    // Trigger click to open file selector
    fileInput.click();
  };

  // Function to perform OCR using Tesseract.js
  const performOCR = async (file: File): Promise<string> => {
    try {
      const { data: { text } } = await Tesseract.recognize(
        file,
        'eng', // Language
        {
          logger: (m) => console.log(m), // Optional logger
        }
      );
      console.log('OCR Result:', text); // Log the OCR result
      return text; // Return the extracted text
    } catch (error) {
      console.error('Error during OCR:', error);
      return 'Error capturing text';
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

        <IonCard><br />
          <IonList className='ionlist'>
            <IonItem>
              <IonInput id="titleInput" label="TITLE: "></IonInput>
              <IonIcon icon={camera} slot="end" onClick={() => handleCapture('titleInput')} />
            </IonItem>

            <IonItem>
              <IonInput id="authorsInput" label="AUTHORS: "></IonInput>
              <IonIcon icon={camera} slot="end" onClick={() => handleCapture('authorsInput')} />
            </IonItem>

            <IonItem>
              <IonInput id="abstractInput" label="ABSTRACT: "></IonInput>
              <IonIcon icon={camera} slot="end" onClick={() => handleCapture('abstractInput')} />
            </IonItem>

            <IonItem>
              <IonInput id="tagsInput" label="TAGS/KEYWORDS: "></IonInput>
              <IonIcon icon={camera} slot="end" onClick={() => handleCapture('tagsInput')} />
            </IonItem>

            <IonItem>
              <IonInput id="yearInput" label="YEAR: "></IonInput>
              <IonIcon icon={camera} slot="end" onClick={() => handleCapture('yearInput')} />
            </IonItem>
            <br />
            <IonButton color={'dark'} className='add'>ADD</IonButton><br />
            <br />
          </IonList>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default Add;
