import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonBackButton} from '@ionic/react';
import './user.css';

const User: React.FC = () => {
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
            <h1>DIGI-BOOKS <br /> USER LOGS</h1>
          </div>
        </div>

        
      </IonContent>
    </IonPage>
  );
};

export default User;
