import React , {useState, useEffect} from 'react';
import '../styles/AddForms.css';
import {useLocation, useNavigate} from 'react-router-dom';
import {BASE_URL, getImageUrl} from "../config";

function NewsEditForm() {

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const itemId = searchParams.get('itemId');
  const [newsID, setNewsID] = useState(itemId);
  const [newsTitle, setNewsTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [text, setText] = useState('');
  const [event_imageID, setEventImageID] = useState(0);
    const [image, setImage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

  useEffect(()=>{
      const fetchData = async () => {
          try{
              const response = await fetch(`${BASE_URL}/api/news/${itemId}`);
              console.log(response);
              if(!response.ok){
                  throw new Error(response.statusText);
              }
              const data = await response.json();
              console.log('Fetched data:', data);
              setNewsID(data.newsID);
              setNewsTitle(data.newsTitle);
              const formattedDate = new Date(data.date).toISOString().slice(0, 10);
              setDate(formattedDate);
              // setDate(new Date(data.date));
              setText(data.text);
              setEventImageID(data.event_imageID);
              setImage(data.imgurl || '');
          } catch(error){
              console.error('Error fetching data:', error);
              setSuccessMessage('');
          }

      }
      fetchData();
  },[itemId])


    const handleEdit = async (event) => {
      event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('newsID', newsID);
            formData.append('newsTitle', newsTitle);
            formData.append('date', date);
            formData.append('text', text);
            formData.append('event_imageID', event_imageID);
            formData.append('image', image);

            const response = await fetch(`${BASE_URL}/api/news/update/${itemId}`, {
                method: 'PUT',
                body: formData,
            });

            const result = await response.json();
            if (result) {
                console.log(result);
                setSuccessMessage('News updated successfully');
                window.alert(`News updated successfully!`);
                navigate('../editNews');
            } else {
                console.error('Failed to update news item');
            }
        } catch (error) {
            console.error('Error updating news item:', error);
        }
    };


    return (
    <div className="add-form-container">

      <div className="header-info">
        <h2 id="main-header">News Page Edit Form</h2>
        <p>This is the page where you, the admin, can edit existing content in the "News" page.</p>
      </div>

        {successMessage && <div className="success-message">{successMessage}</div>}
        <form onSubmit={(e) => handleEdit(e)} className="form-combined">
            <div className="form-container">
                <div className="form-element">
                    <label>Edit Image</label>
                    <input
                        className="file-form"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}

                    />
                </div>
            </div>
            <div className="form-element">
                <label>Title</label>
                <input
                    className="text-form"
                    type="text"
                    value={newsTitle}
                    onChange={(e) => setNewsTitle(e.target.value)}
                    required
                />
            </div>
            <div className="form-element">
                <label>Date</label>
                <input
                    className="text-form"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            <div className="form-element">
                <label>Text</label>
                <input
                    className="text-form"
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                />
            </div>
            {/*<div className="form-element">*/}
            {/*    <label>Image</label>*/}
            {/*    <input*/}
            {/*        className="text-form"*/}
            {/*        type="text"*/}
            {/*        value={event_imageID}*/}
            {/*        onChange={(e) => setEventImageID(e.target.value)}*/}
            {/*        required*/}
            {/*    />*/}
            {/*</div>*/}
            {/*<div className="form-element">*/}
            {/*    <label>Event Image ID</label>*/}
            {/*    <input*/}
            {/*        className="text-form"*/}
            {/*        type="text"*/}
            {/*        value={event_imageID}*/}
            {/*        onChange={(e) => setEventImageID(e.target.value)}*/}
            {/*        required*/}
            {/*    />*/}
            {/*</div>*/}
            <div className="form-element">
                <label>Image</label>
                {image && <img
                    src={getImageUrl(image)}
                    alt={newsTitle}
                    style={{
                        width: '20vw',
                        height: '20vw'
                    }}
                />}
            </div>
            <div className="submit-button-container">
                <button type="submit">Submit</button>
                {/*<button type="button" onClick={onCancel}>Cancel</button>*/}
            </div>
        </form>

    </div>
    )
}

export default NewsEditForm;