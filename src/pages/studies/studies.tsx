import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonButton,
  IonModal,
  IonInput,
  IonItem,
  IonLabel,
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import './studies.css'; // Ensure to add styles for lively effects

interface Study {
  id: number;
  title: string;
  author: string;
  abstract: string;
  keywords: string;
  year: number;
  identifier: string;
  type: string;
}

const Studies: React.FC = () => {
  const [studies, setStudies] = useState<Study[]>([]);
  const [selectedStudy, setSelectedStudy] = useState<Study | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [expandedAbstract, setExpandedAbstract] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [studyToDelete, setStudyToDelete] = useState<Study | null>(null);


  // New states for filtering and searching
  const [typeFilter, setTypeFilter] = useState<string>(''); // For type filter
  const [yearFilter, setYearFilter] = useState<number | ''>(''); // For year filter
  const [searchQuery, setSearchQuery] = useState<string>(''); // For keyword search

  // Fetch studies from the backend
  const fetchStudies = async () => {
    try {
      const response = await fetch('http://localhost:3000/studies');
      const data = await response.json();
      setStudies(data);
    } catch (error) {
      console.error('Error fetching studies:', error);
    }
  };

  const handleDelete = (study: Study) => {
    setStudyToDelete(study);
    setShowDeleteModal(true);
  };

  const confirmDeleteStudy = async () => {
    if (studyToDelete) {
      try {
        await fetch(`http://localhost:3000/delete-study/${studyToDelete.id}`, { method: 'DELETE' });
        setMessage('Study deleted successfully!');
        fetchStudies();  // Refresh the list of studies
      } catch (error) {
        console.error('Error deleting study:', error);
        setMessage('Failed to delete study.');
      } finally {
        setShowDeleteModal(false);
        setStudyToDelete(null);  // Clear the selected study
      }
    }
  };
  
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setStudyToDelete(null);
  };
  
  

  const deleteStudy = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/delete-study/${id}`, { method: 'DELETE' });
      setMessage('Study deleted successfully!');
      fetchStudies(); // Refresh studies list after deletion
    } catch (error) {
      console.error('Error deleting study:', error);
      setMessage('Failed to delete study.');
    }
  };

  const updateStudy = (study: Study) => {
    setSelectedStudy(study);
    setShowModal(true);
  };

  const handleUpdateSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/update-study/${selectedStudy?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedStudy),
      });

      const data = await response.json();
      console.log('Response from server:', data); // Log the response from the server
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update');
      }

      // Close the modal after a successful update
      setMessage('Study updated successfully!'); // Optionally set a success message
      fetchStudies(); // Optionally refresh the studies list after update
    } catch (error) {
      console.error('Error during update:', error.message);
      setMessage('Failed to update study.');
    }
  };

  const toggleAbstract = (id: number) => {
    setExpandedAbstract(expandedAbstract === id ? null : id);
  };

  useEffect(() => {
    fetchStudies();
  }, []);

  // Filtered studies based on selected filters and search
  const filteredStudies = studies.filter((study) => {
    const matchesType = typeFilter ? study.type === typeFilter : true;
    const matchesYear = yearFilter ? study.year === yearFilter : true;
    const matchesKeywords = searchQuery
      ? study.keywords.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesType && matchesYear && matchesKeywords;
  });

  // Function to handle filter button click
  const handleFilterClick = () => {
    // This could set the filtered studies state if you wanted to manage it differently
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonBackButton className="back" defaultHref="/" />
          <IonTitle>Studies</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" fullscreen>
        <div className="logo">
          <img src="src/assets/book.png" className="logo-img" alt="logo" />
          <h1 className="logo-text">
            DIGI-BOOKS <br /> STUDIES
          </h1>
        </div>

        {message && <div className="message">{message}</div>} {/* Feedback message */}

        {/* Filters and Search Bar */}
        <div className="filters-container">
          <IonItem>
            <IonLabel position="stacked">Filter by Type</IonLabel>
            <IonInput
              value={typeFilter}
              onIonChange={(e: CustomEvent<{ value: string | null }>) =>
                setTypeFilter(e.detail.value || '')
              }
              placeholder="Enter type..."
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Filter by Year</IonLabel>
            <IonInput
              type="number"
              value={yearFilter}
              onIonChange={(e: CustomEvent<{ value: string | null }>) =>
                setYearFilter(e.detail.value ? parseInt(e.detail.value, 10) : '')
              }
              placeholder="Enter year..."
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Search Keywords</IonLabel>
            <IonInput
              value={searchQuery}
              onIonChange={(e: CustomEvent<{ value: string | null }>) =>
                setSearchQuery(e.detail.value || '')
              }
              placeholder="Search by keywords..."
            />
          </IonItem>
        </div>

        {/* Filter Button */}
        <div className="filter-button-container">
          <IonButton color={'warning'} className="filter-button" onClick={handleFilterClick}>
            Apply Filters
          </IonButton>
        </div>

        {/* Studies List */}
        <div className="studies-container">
          {filteredStudies.length > 0 ? (
            filteredStudies.map((study) => (
              <IonCard key={study.id} className="study-card animated-card">
                <IonCardHeader>
                  <h2>
                    <strong>Title:</strong> {study.title}
                  </h2>
                </IonCardHeader>
                <IonCardContent>
                  <p>
                    <strong>Author:</strong> {study.author}
                  </p>
                  <p>
                    <strong>Abstract:</strong>
                    {expandedAbstract === study.id
                      ? study.abstract
                      : `${study.abstract.slice(0, 100)}...`}
                    <span className="see-more" onClick={() => toggleAbstract(study.id)}>
                      {expandedAbstract === study.id ? ' See less' : ' See more'}
                    </span>
                  </p>
                  <p>
                    <strong>Keywords:</strong> {study.keywords}
                  </p>
                  <p>
                    <strong>Year:</strong> {study.year}
                  </p>
                  <p>
                    <strong>Type:</strong> {study.identifier}
                  </p>
                  <p>
                    <strong>Course:</strong> {study.type}
                  </p>
                  <div className="button-container">
                    <IonButton color="dark" onClick={() => updateStudy(study)}>
                      Update
                    </IonButton>
                    <IonButton color="danger" onClick={() => handleDelete(study)}>
                      Delete
                    </IonButton>

                  </div>
                </IonCardContent>
              </IonCard>
            ))
          ) : (
            <p className="no-studies">No studies available</p>
          )}
        </div>
        
        <IonModal isOpen={showDeleteModal} onDidDismiss={cancelDelete}>
  {studyToDelete && (
    <div className="modal-content">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete the study titled: <strong>{studyToDelete.title}</strong>?</p>
      <div className="modal-buttons">
        <IonButton color="danger" onClick={confirmDeleteStudy}>
          Confirm
        </IonButton>
        <IonButton onClick={cancelDelete}>
          Cancel
        </IonButton>
      </div>
    </div>
  )}
</IonModal>

        {/* Update Modal */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          {selectedStudy && (
            <div className="modal-content">
              <h2>Update Study</h2>
              <IonItem>
                <IonLabel position="stacked">Title</IonLabel>
                <IonInput
                  value={selectedStudy.title}
                  onIonChange={(e: CustomEvent<{ value: string | null }>) =>
                    setSelectedStudy({ ...selectedStudy, title: e.detail.value || '' })
                  }
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Author</IonLabel>
                <IonInput
                  value={selectedStudy.author}
                  onIonChange={(e: CustomEvent<{ value: string | null }>) =>
                    setSelectedStudy({ ...selectedStudy, author: e.detail.value || '' })
                  }
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Abstract</IonLabel>
                <IonInput
                  value={selectedStudy.abstract}
                  onIonChange={(e: CustomEvent<{ value: string | null }>) =>
                    setSelectedStudy({ ...selectedStudy, abstract: e.detail.value || '' })
                  }
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Keywords</IonLabel>
                <IonInput
                  value={selectedStudy.keywords}
                  onIonChange={(e: CustomEvent<{ value: string | null }>) =>
                    setSelectedStudy({ ...selectedStudy, keywords: e.detail.value || '' })
                  }
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Year</IonLabel>
                <IonInput
                  type="number"
                  value={selectedStudy.year}
                  onIonChange={(e: CustomEvent<{ value: string | null }>) =>
                    setSelectedStudy({
                      ...selectedStudy,
                      year: e.detail.value ? parseInt(e.detail.value, 10) : 0,
                    })
                  }
                />
              </IonItem><br />
              <IonButton color={'dark'} onClick={handleUpdateSubmit}>Update</IonButton>
              <IonButton color={'danger'} onClick={() => setShowModal(false)}>Back</IonButton>
            </div>
          )}
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Studies;
