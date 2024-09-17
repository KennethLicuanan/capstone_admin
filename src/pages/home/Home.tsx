import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCard } from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
  const [totalStudies, setTotalStudies] = useState<number>(0);
  const [studiesByType, setStudiesByType] = useState<{ type: string; count: number }[]>([]);

  const fetchTotalStudies = () => {
    fetch('http://localhost:3000/total-studies')
      .then(response => response.json())
      .then(data => {
        console.log('Total Studies API response:', data);
        setTotalStudies(data.total);
      })
      .catch(error => console.error('Error fetching total studies:', error));
  };

  const fetchStudiesByType = () => {
    fetch('http://localhost:3000/studies-by-type')
      .then(response => response.json())
      .then(data => {
        console.log('Studies by Type API response:', data);
        setStudiesByType(data);
      })
      .catch(error => console.error('Error fetching studies by type:', error));
  };

  useEffect(() => {
    fetchTotalStudies(); // Fetch initially
    fetchStudiesByType(); // Fetch studies by type
    const intervalId = setInterval(() => {
      fetchTotalStudies();
      fetchStudiesByType();
    }, 5000); // Fetch every 5 seconds

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, []);

  const getBarWidth = (count: number) => `${(count / totalStudies) * 100}%`;

  const getStudyCount = (type: string) => {
    const study = studiesByType.find(study => study.type === type);
    return study ? study.count : 0;
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
            <img src="src/assets/book.png" height="150" alt="logo" />
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
              <label>TOTAL RESEARCH STUDIES</label>
              <div className="bar">
                <div className="bar-inner bar-total" style={{ width: getBarWidth(totalStudies) }}></div>
              </div>
              <p>{totalStudies} studies available</p>
            </div>

            <div className="stat-item">
              <label>TOTAL STUDIES OF TEP PROGRAM</label>
              <div className="bar">
                <div className="bar-inner bar-tep" style={{ width: getBarWidth(getStudyCount('TEP')) }}></div>
              </div>
              <p>{getStudyCount('TEP')} new studies</p>
            </div>
            <div className="stat-item">
              <label>TOTAL STUDIES OF IT PROGRAM</label>
              <div className="bar">
                <div className="bar-inner bar-it" style={{ width: getBarWidth(getStudyCount('BSIT')) }}></div>
              </div>
              <p>{getStudyCount('BSIT')} new studies</p>
            </div>
            <div className="stat-item">
              <label>TOTAL STUDIES OF BA PROGRAM</label>
              <div className="bar">
                <div className="bar-inner bar-ba" style={{ width: getBarWidth(getStudyCount('BSBA')) }}></div>
              </div>
              <p>{getStudyCount('BSBA')} new studies</p>
            </div>

            <div className="stat-item">
              <label>ACTIVE USERS</label>
              <div className="bar">
                <div className="bar-inner bar-active-users"></div>
              </div>
              <p>90% of users from IT major</p>
            </div>
          </div>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
