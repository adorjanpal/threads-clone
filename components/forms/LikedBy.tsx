"use client";
import React, { useState } from "react";

import LikersCard from "../cards/LikersCard";

import Modal from "./Modal";

interface Props {
  likers: {
    name: string;
    username: string;
    image: string;
    id: string;
  }[];
}

const LikedBy = ({ likers }: Props) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <button type="button" onClick={handleOpen} className="text-gray-1">
        {likers.length}
      </button>

      <Modal isOpen={open} onClose={handleClose}>
        <>
          {likers.length != 0 ? (
            <LikersCard likers={likers} />
          ) : (
            <h3>No likes on this thread yet...</h3>
          )}
        </>
      </Modal>
    </>
  );
};

export default LikedBy;
