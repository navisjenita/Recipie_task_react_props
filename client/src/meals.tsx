import img1 from '../src/assets/meals (1).jpg'
import './meals.css'
const MealsSummary = () => {
  return (
    <>
      <div className='body1'>
        <img src={img1} className='img' />

        <section className="summary">
          <h2 className='heading'>Delicious Food, Delivered To You</h2>
          <p className='parameals'>
            Choose your favorite meal from our broad selection of available meals
            and enjoy a delicious lunch or dinner at home.
          </p>
          <p className='parameals'>
            All our meals are cooked with high-quality ingredients, just-in-time and
            of course by experienced chefs!
          </p>
        </section>
      </div>
    </>

  );
};

export default MealsSummary;