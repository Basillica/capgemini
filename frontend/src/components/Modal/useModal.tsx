import React, { useState } from "react";

export default function useModal() {
  const [show, setShow] = useState(false);
  const showModal = () => setShow(true);
  const closeModal = () => setShow(false);


  return {
    show,
    showModal,
    closeModal
  };
}