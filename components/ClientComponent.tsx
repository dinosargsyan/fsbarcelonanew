'use client';

import { useEffect, useState } from 'react';
import { CircularProgress } from "@nextui-org/progress";
import Slider from '@madzadev/image-slider';
import "@madzadev/image-slider/dist/index.css";

const ClientComponent = ({ images }) => {
  const [imagesArr, setImagesArr] = useState([]);

  useEffect(() => {
    if (images && images.length > 0) {
      setImagesArr(images);
    }
    console.log('imagesArr', images)
  }, [images]);

  if (imagesArr.length === 0) {
    return <CircularProgress aria-label="Loading..." />;
  }

  return <Slider imageList={imagesArr} width={1000} height={500}/>;
};

export default ClientComponent;
