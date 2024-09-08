import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonButton } from '@ionic/react';
import './data.css';

const Data: React.FC = () => {
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
            <h1>DIGI-BOOKS <br /> DATA STATS</h1>
          </div>
        </div>

        
      </IonContent>
    </IonPage>
  );
};

export default Data;
