import { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonAlert,
  IonLoading, // Import IonLoading component
} from '@ionic/react';
import './Login.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState<boolean>(false); // State to manage loading

  const handleLogin = () => {
    setShowLoading(true); // Show loading spinner

    // Simulate a network request with a timeout
    setTimeout(() => {
      setShowLoading(false); // Hide loading spinner

      if (username === 'admin' && password === 'admin123') {
        console.log('Login successful');
        window.location.href = '/home'; // Replace with your actual route
      } else {
        setShowAlert(true); // Show alert if login is invalid
      }
    }, 2000); // Simulated delay of 2 seconds
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>

        
        {/* Loading Spinner */}
        <IonLoading
          isOpen={showLoading}
          message={'Please wait...'}
          duration={0} // Duration set to 0 to show until explicitly hidden
        />

          <div className="admin">
            <img src="src\assets\book.png" height="150" alt="logo" />
            <h1>DIGI-BOOKS <br /> ADMIN</h1></div>
<br />
        {/* Login Form */}
        <IonItem>
          <IonLabel className='label' position="floating">Username</IonLabel><br />
          <IonInput
            value={username}
            onIonChange={(e: CustomEvent) => setUsername(e.detail.value ?? '')}
            type="text"
          />
        </IonItem>
<br />
        <IonItem>
          <IonLabel className='label' position="floating">Password</IonLabel><br />
          <IonInput
            value={password}
            onIonChange={(e: CustomEvent) => setPassword(e.detail.value ?? '')}
            type="password"
          />
        </IonItem>
<br />
        <IonButton className='logbut' color={'warning'} onClick={handleLogin}>
          Login
        </IonButton>

        {/* Alert for Invalid Login */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Login Failed'}
          message={'Invalid username or password. Please try again.'}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;