import React from "react";
import Layout from "./../components/Layout/Layout";
import { FaEnvelope, FaPhone } from 'react-icons/fa';

const Contact = () => {
  return (
    <Layout title={"Contact us"}>
    
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2"> 
            any query and info about prodduct feel free to call anytime we 24X7
            vaialible
          </p>
          <p className="mt-3">
            <FaEnvelope /> : gagandeepsingh220903@gmail.com
          </p>
          <p className="mt-3">
            <FaPhone /> : 9463567280
          </p>
        
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
