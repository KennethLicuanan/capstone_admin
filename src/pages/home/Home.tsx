import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <div className="container">
          <div className="logo">
            <img src="src\assets\book.png" height="150" alt="logo" />
            <h1>DIGI-BOOKS <br /> ADMIN</h1>
          </div>
          <IonButton expand="block" color={'light'} className="custom-button" routerLink="/add">
            ADD STUDY
          </IonButton>
          <IonButton expand="block" color={'light'} className="custom-button" routerLink="/user">
            USER LOGS
          </IonButton>
          <IonButton expand="block" color={'light'} className="custom-button" routerLink="/data">
            DATA ANALYTICS
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
