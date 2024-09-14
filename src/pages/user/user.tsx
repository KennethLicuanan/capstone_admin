import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonCard, IonCardHeader, IonCardContent } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import './user.css';

const User: React.FC = () => {
  const [userLogs, setUserLogs] = useState<{ id: number; email: string; activity: string; date: string }[]>([]);

  useEffect(() => {
    const logs = [
      { id: 1, email: 'user1@example.com', activity: 'Logged in', date: '2024-09-14 09:00 AM' },
      { id: 2, email: 'user2@example.com', activity: 'Viewed Research Study', date: '2024-09-14 09:15 AM' },
      { id: 3, email: 'user3@example.com', activity: 'Logged out', date: '2024-09-14 09:30 AM' }
    ];
    setUserLogs(logs);
  }, []);

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
            <h1>DIGI-BOOKS <br /> USER LOGS</h1>
          </div>
        </div>

        {/* Styled User Logs Section */}
        <IonCard className="logs-card">
          <IonCardHeader>
            <h2>User Activity Logs</h2>
          </IonCardHeader>
          <IonCardContent>
            <table className="logs-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Activity</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {userLogs.length > 0 ? (
                  userLogs.map(log => (
                    <tr key={log.id}>
                      <td>{log.id}</td>
                      <td>{log.email}</td>
                      <td>{log.activity}</td>
                      <td>{log.date}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="no-logs-message">No logs available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default User;
