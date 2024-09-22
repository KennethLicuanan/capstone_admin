import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonCard, IonCardHeader, IonCardContent } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import './user.css';

const User: React.FC = () => {
  const [userLogs, setUserLogs] = useState<{ credentials: string; activity: string; date: string }[]>([]);

  // Function to fetch user logs
  const fetchUserLogs = async () => {
    try {
      const response = await fetch('http://localhost:3001/user-logs');
      const data = await response.json();
      setUserLogs(data);
    } catch (error) {
      console.error('Error fetching user logs:', error);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchUserLogs();

    // Polling every 5 seconds to check for new logs
    const interval = setInterval(() => {
      fetchUserLogs();
    }, 5000); // 5 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonBackButton className="back" defaultHref="/" />
          <IonTitle>User Logs</IonTitle><br />
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" fullscreen>
        <div className="logo">
          <img src="src/assets/book.png" className="logo-img" alt="logo" />
          <h1 className="logo-text">DIGI-BOOKS <br /> USER LOGS</h1>
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
            <p className="no-logs">No logs available</p>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default User;
