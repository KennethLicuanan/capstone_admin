import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import './dash.css';

const Dash: React.FC = () => {

  const handleLogout = () => {
    // Clear user session or authentication tokens here if needed
    console.log('Logging out...');
    // Redirect to login page
    window.location.href = '/login'; // Replace '/login' with the actual route to your login page
  };

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
          {/* Logout Button */}
          <IonButton expand="block" color={'danger'} className="custom-button" onClick={handleLogout}>Logout</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dash;