import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonCard, IonProgressBar } from '@ionic/react';
import './data.css';

const Data: React.FC = () => {
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
            <h1>DIGI-BOOKS <br /> DATA STATS</h1>
          </div>
        </div>

        <IonCard color={'warning'} className='stats'>
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
              <label>Top Major</label>
              <IonProgressBar value={0.9} color="primary"></IonProgressBar>
              <p>90% of studies from IT major</p>
            </div>
          </div>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Data;
