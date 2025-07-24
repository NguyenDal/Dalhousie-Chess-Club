import React , {useState, useEffect} from 'react';
import '../styles/AddForms.css';
import {Link, useLocation} from 'react-router-dom';
import {BASE_URL} from "../config";

function TrainersEditForm() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const itemId = searchParams.get('itemId');
  const [speaker, setSpeaker] = useState([]);
  const [speakerID, setSpeakerID] = useState(Number(itemId));
  const [name, setName] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [bio, setBio] = useState('');
  const [people_imageID, setPeople_imageID] = useState(0);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response = await fetch(`${BASE_URL}/api/speaker/${itemId}`);
                console.log(response);
                setSuccessMessage('fetched news successfully');
                if(!response.ok){
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                console.log('Fetched data:', data);
                setSpeaker(data[0]);
                setSpeakerID(data[0].speakerID);
                setName(data[0].name);
                setSpeciality(data[0].speciality);
                setBio(data[0].bio);
                setPeople_imageID(data[0].people_imageID);
                console.log("speaker is ", speaker);
            } catch(error){
                console.error('Error fetching data:', error);
                setSuccessMessage('');
            }

        }
        fetchData();
    },[itemId])

  const handleEdit = async (e) => {
        e.preventDefault();
        const formData = { name, speciality, bio, people_imageID };
    try {
        const response = await fetch(`${BASE_URL}/api/speaker/edit/${speakerID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (result) {
            console.log(result);
            setSuccessMessage("Edit Successful");
        } else {
            console.error('Failed to update trainer');
        }
    } catch (error) {
        console.error('Error updating trainer:', error);
    }
};

  return (
      <div className="add-form-container">

          <div className="header-info">
              <h2 id="main-header">Trainers Page Edit Form</h2>
              <p>This is the page where you, the admin, can edit existing content in the "Trainers" page.</p>
          </div>

          {successMessage && <div className="success-message">{successMessage}</div>}
          <form onSubmit={(e)=>handleEdit(e)} className="form-combined">
              <div className="form-element">
                  <label>Name</label>
                  <input
                      className="text-form"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                  />
              </div>
              <div className="form-element">
                  <label>Speciality</label>
                  <input
                      className="text-form"
                      type="text"
                      value={speciality}
                      onChange={(e) => setSpeciality(e.target.value)}
                      required
                  />
              </div>
              <div className="form-element">
                  <label>Bio</label>
                  <input
                      className="text-form"
                      type="text"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      required
                  />
              </div>
              <div className="form-element">
                  <label>Image</label>
                  <input
                      className="text-form"
                      type="text"
                      value={people_imageID}
                      onChange={(e) => setPeople_imageID(e.target.value)}
                      required
                  />
              </div>
              <div className="submit-button-container">
                  <button type="submit">Submit</button>
                  <Link to={'/editTrainer'}>
                      <button type="submit">Cancel</button>
                  </Link>
              </div>
          </form>
      </div>
  )
}

export default TrainersEditForm;