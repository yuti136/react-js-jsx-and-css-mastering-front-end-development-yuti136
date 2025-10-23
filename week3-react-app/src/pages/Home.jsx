import React from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import Button from '../components/Button';

const Home = () => {
  return (
    <Layout>
      <h2 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
        Welcome to React Mastery 🚀
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          title="Reusable Components"
          content="Learn to build modular UI pieces using props and Tailwind CSS."
          footer={<Button variant="primary">Learn More</Button>}
        />
        <Card
          title="Hooks & State"
          content="Understand how to handle dynamic data with React Hooks."
          footer={<Button variant="secondary">Explore</Button>}
        />
        <Card
          title="API Integration"
          content="Integrate APIs and display dynamic data efficiently."
          footer={<Button variant="danger">Try Now</Button>}
        />
      </div>
    </Layout>
  );
};

export default Home;
