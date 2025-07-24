import React, {useState} from "react";
import TrainerPopUp from './trainerPopUp';
import "./styles/trainer.css";

function TrainerItem({name, image,  description }) {
  
  const [showPopUp, setShowPopUp] = useState(false);
  
  const togglePopUp = () => {
    setShowPopUp(!showPopUp);
  }

  return (
    <div className="trainerItemContainer">
      <div className="trainerItem" onClick={togglePopUp}>
      <img className="trainer-image" src={image} alt="Trainer Image" />
      <h2> {name} </h2>
      {showPopUp && (
        <TrainerPopUp
          name={name}
          image={image}
          description={description}
          onClose={togglePopUp}
        />
      )}
      </div>
    </div>
  );
}

export default TrainerItem;