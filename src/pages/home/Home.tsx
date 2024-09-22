import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCard, IonIcon } from '@ionic/react';
import { laptop, briefcase, school } from 'ionicons/icons';
import { useHistory } from 'react-router-dom'; // Import useHistory for navigation
import './Home.css';

const Home: React.FC = () => {
  const history = useHistory(); // Initialize history for navigation
  const [totalStudies, setTotalStudies] = useState<number>(0);
  const [studiesByType, setStudiesByType] = useState<{ type: string; count: number }[]>([]);

  const fetchTotalStudies = () => {
    fetch('http://localhost:3001/total-studies')
      .then(response => response.json())
      .then(data => {
        console.log('Total Studies API response:', data);
        setTotalStudies(data.total);
      })
      .catch(error => console.error('Error fetching total studies:', error));
  };

  const fetchStudiesByType = () => {
    fetch('http://localhost:3001/studies-by-type')
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

  const handleLogout = () => {
    // Clear any authentication state here if applicable
    history.push('/login'); // Redirect to the login page
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Admnistrator Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <div className="container">
          <div className="logo">
            <img src="src/assets/book.png" height="150" alt="logo" />
            <h1>DIGI-BOOKS <br /> DASHBOARD</h1>
          </div>

          <IonCard color={"primary"} className='stats'>
            <h1>ANALYTICS</h1>
            <div className="analytics-section">
              <div className="stat-item">
                <IonIcon icon={laptop} slot="start" />
                <label>TOTAL RESEARCH STUDIES</label>
                <div className="bar">
                  <div className="bar-inner bar-total" style={{ width: getBarWidth(totalStudies) }}></div>
                </div>
                <p>{totalStudies} studies available</p>
              </div>

              <div className="stat-item">
                <IonIcon icon={school} slot="start" />
                <label>TEACHERS EDUCATION PROGRAM</label>
                <div className="bar">
                  <div className="bar-inner bar-tep" style={{ width: getBarWidth(getStudyCount('TEP')) }}></div>
                </div>
                <p>{getStudyCount('TEP')} new studies</p>
              </div>

              <div className="stat-item">
                <IonIcon icon={laptop} slot="start" />
                <label>COLLEGE OF COMPUTER STUDIES</label>
                <div className="bar">
                  <div className="bar-inner bar-it" style={{ width: getBarWidth(getStudyCount('BSIT')) }}></div>
                </div>
                <p>{getStudyCount('BSIT')} new studies</p>
              </div>

              <div className="stat-item">
                <IonIcon icon={briefcase} slot="start" />
                <label>BUSINESS ADMINISTRATION STUDIES</label>
                <div className="bar">
                  <div className="bar-inner bar-ba" style={{ width: getBarWidth(getStudyCount('BSBA')) }}></div>
                </div>
                <p>{getStudyCount('BSBA')} new studies</p>
              </div>
            </div>
          </IonCard>
          <IonButton expand="block" color={'warning'} className="custom-button" routerLink="/add">
            ADD STUDY
          </IonButton>
          <IonButton expand="block" color={'warning'} className="custom-button" routerLink="/user">
            MANAGE USER LOGS
          </IonButton>
          <IonButton expand="block" color={'warning'} className="custom-button" routerLink="/studies">
            MANAGE STUDIES
          </IonButton>
          <IonButton expand="block" color={'danger'} className="custom-button" onClick={handleLogout}>
            Logout
          </IonButton>
        </div>
        <br />
      </IonContent>
    </IonPage>
  );
};

export default Home;
