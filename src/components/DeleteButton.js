import React from "react";
import { useState } from "react";
import axios from "axios";
import { Button } from "@mui/joy";
import Modal from "@mui/joy";

const DeleteButton = ({ id, resource, deleteCallback }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = () => {
    setIsLoading(true);
    let token = localStorage.getItem("token");
    if(resource.enrolment){
      resource.enrolments.forEach((enrolment) => {
        axios
          .delete(`https://college-api.vercel.app/api/enrolments/${enrolment.id}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
    else{
      axios
      .delete(`https://college-api.vercel.app/api/${resource}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        deleteCallback(id);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    }
   
    
  };
  return (
    <Button onClick={onDelete}>
        {isLoading ? "Deleting..." : "Delete"}
    </Button>
  )
};

export default DeleteButton;
