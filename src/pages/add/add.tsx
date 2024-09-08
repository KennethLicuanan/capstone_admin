import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonBackButton,
  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, 

  } 
from '@ionic/react';
import './add.css';

const Add: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
      <IonBackButton className='back' defaultHref="/" />
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <div className="container">
          <div className="logo">
            <img src="src\assets\book.png" height="150" alt="logo" />
            <h1>DIGI-BOOKS <br /> ADD STUDY</h1>
          </div>
        </div>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Card Title</IonCardTitle>
            <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>Here's a small text description for the card content. Nothing more, nothing less.</IonCardContent>
    </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default Add;
