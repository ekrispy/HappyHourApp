import React from 'react';
import Carousel from '../Carousel/Carousel.jsx'; // Import the Carousel component
import Cattivella from "../../assets/Catt2.jpg";
import Ang from "../../assets/ang3.jpg";
import Kona from "../../assets/kona.jpg";

const Home = () => {
  const happyHourImages = [
    {
      id: 1,
      image: Cattivella,
      title: 'Cattivella',
      location: '10195 E 29th Dr Suite 110, Denver, CO 80238',
    },
    {
      id: 2,
      image: Ang,
      title: "Angelo's Taverna ",
      location: '620 E 6th Ave, Denver, CO 80203',
    },
    {
      id: 3,
      image: Kona,
      title: 'Kona Grill',
      location: '3000 East 1st Ave, #184 Cherry Creek Mall, Denver, CO 80206',
    },
    // Add more images here
  ];

  return (
    <div className="h-screen p-4">
            <p className="text-xl mb-10 mt-10 flex gap-2 items-center justify-center text-center">Featured Happy Hour Deals</p>
      <Carousel images={happyHourImages} /> {/* Use the Carousel component */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <Card 
          title="Weekly Happy Hour Deals" 
          description="Check out the best deals of the week!" 
          link="/weekly-deals" 
        />
        <Card 
          title="New Happy Hours" 
          description="Discover the newest happy hours in town!" 
          link="/new-happy-hours" 
        />
        <Card 
          title="Late Night Happy Hours" 
          description="Find late night happy hour specials!" 
          link="/late-night-deals" 
        />
        <Card 
          title="All Day HappyHours" 
          description="Explore All day HappyHours!" 
          link="/weekly-specials" 
        />
      </div>
    </div>
  );
};

const Card = ({ title, description, link }) => {
  return (
    <div className="border rounded shadow p-4 bg-white">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="mb-4">{description}</p>
      <a href={link} className="text-blue-500 hover:text-blue-700">Learn More</a>
    </div>
  );
};

export default Home;
