import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonCard, IonCardHeader, IonCardContent } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import './user.css';

const User: React.FC = () => {
  const [userLogs, setUserLogs] = useState<{ credentials: string; activity: string; date: string }[]>([]);

  useEffect(() => {
    const fetchUserLogs = async () => {
      try {
        const response = await fetch('http://localhost:3001/user-logs');
        const data = await response.json();
        setUserLogs(data);
      } catch (error) {
        console.error('Error fetching user logs:', error);
      }
    };

    fetchUserLogs();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonBackButton className='back' defaultHref="/" />
          <IonTitle>User Logs</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" fullscreen>
        <div className="logo">
          <img src="src/assets/book.png" height="150" alt="logo" />
          <h1>DIGI-BOOKS USER LOGS</h1>
        </div>

        {/* User Logs */}
        <div className="logs-container">
          {userLogs.length > 0 ? (
            userLogs.map((log, index) => (
              <IonCard key={index} className="log-card">
                <IonCardHeader>
                  <h2><strong>Student ID: </strong>{log.credentials}</h2>
                </IonCardHeader>
                <IonCardContent>
                  <p><strong>Activity:</strong> {log.activity}</p>
                  <p><strong>Date:</strong> {new Date(log.date).toLocaleString()}</p>
                </IonCardContent>
              </IonCard>
            ))
          ) : (
            <p>No logs available</p>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default User;
