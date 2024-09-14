import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonProgressBar, IonCard } from '@ionic/react';
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
          
          <IonButton expand="block" color={'warning'} className="custom-button" routerLink="/add">
            ADD STUDY
          </IonButton>
          <IonButton expand="block" color={'warning'} className="custom-button" routerLink="/user">
            USER LOGS
          </IonButton>
        </div><br />

        <IonCard color={"primary"} className='stats'>
          <h1>ANALYTICS</h1>
          <div className="analytics-section">
            <div className="stat-item">
              <label>Total Research Studies</label>
              <IonProgressBar value={0.7} color="success"></IonProgressBar>
              <p>70% of available slots filled</p>
            </div>
            <div className="stat-item">
              <label>Studies Added This Year</label>
              <IonProgressBar value={0.5} color="tertiary"></IonProgressBar>
              <p>50 new studies</p>
            </div>
            <div className="stat-item">
              <label>Active User's</label>
              <IonProgressBar value={0.9} color="primary"></IonProgressBar>
              <p>90% of user's from IT major</p>
            </div>
          </div>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
