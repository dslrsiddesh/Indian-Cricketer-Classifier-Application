import PropTypes from 'prop-types';

const Card = ({ image }) => {
  return (
    <div className='card'>
      <img src={image.url} alt={image.title} />
      <p>{image.title}</p>
    </div>
  );
};

Card.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
