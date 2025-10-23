import React from 'react';
import Layout from '../components/Layout';

const About = () => {
  return (
    <Layout>
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">About This Project</h2>
      <p className="text-gray-700 leading-relaxed">
        This React app demonstrates component-based architecture using JSX and Tailwind CSS v4.
        Components are reusable, customizable via props, and structured for scalable development.
      </p>
    </Layout>
  );
};

export default About;
