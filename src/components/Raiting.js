import React from 'react';
import '../App.scss'
import Star from './Star'

function Raiting(props) {
  const {
    index,
    rating,
    hoverRating,
    onMouseEnter,
    onMouseLeave,
    onSaveRating,
  } = props;
  const fill = React.useMemo(() => {
    if (hoverRating >= index) {
      return '#a6e1fa';
    } else if (!hoverRating && rating >= index) {
      return '#0e6ba8';
    }
    return 'none';
  }, [rating, hoverRating, index]);
  return (
      <div
        onMouseEnter={() => onMouseEnter(index)} 
        onMouseLeave={() => onMouseLeave()} 
        onClick={() => onSaveRating(index)}>
        <Star fill={fill} />
      </div>
  )
}
export default Raiting;
