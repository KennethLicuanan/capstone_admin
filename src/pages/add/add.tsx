import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonBackButton,
  IonCard, 
  IonInput, IonItem, IonList, IonIcon
  } 
from '@ionic/react';
import './add.css';

const Add: React.FC = () => {
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
            <img src="src\assets\book.png" height="150" alt="logo" />
            <h1>DIGI-BOOKS <br /> ADD STUDY</h1>
          </div>
        </div>

        <IonCard><br />
                <IonList className='ionlist'>
              <IonItem>
                <IonInput label="TITLE: "></IonInput>
              </IonItem>

              <IonItem>
                <IonInput label="AUTHORS: "></IonInput>
              </IonItem>

              <IonItem>
                <IonInput label="ABSTRACT: "></IonInput>
              </IonItem>

              <IonItem>
                <IonInput label="TAGS/KEYWRODS: "></IonInput>
              </IonItem>

              <IonItem>
                <IonInput label="YEAR: "></IonInput>
              </IonItem>
<br />
              <IonButton color={'dark'} className='add' >ADD</IonButton><br />
              <br />
            </IonList>

          </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default Add;
