import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

function GeminiInReact({ title, onAcceptResponse, onRejectResponse }) {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentResponse, setCurrentResponse] = useState('');
  
  const genAI = new GoogleGenerativeAI(
    "AIzaSyCZuQTJPk8jlVl2lLBf1fXTP1YEwLvvHD8" // replace with your actual API key
  );

  useEffect(() => {
    if (title) {
      setInputValue(`Write a story about "${title}"`);
    }
  }, [title]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const getResponseForGivenPrompt = async () => {
    try {
      setLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(inputValue);
      setInputValue('');
      const response = await result.response.text();
      setCurrentResponse(response);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const handleAccept = () => {
    onAcceptResponse(currentResponse);
    setCurrentResponse(''); // Clear the response
  };

  const handleReject = () => {
    onRejectResponse();
    setCurrentResponse(''); // Clear the response
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Ask Me Something You Want"
            className="form-control"
          />
        </div>
        <div className="col-auto">
          <button onClick={getResponseForGivenPrompt} className="btn btn-primary">AI  Suggestion</button>
        </div>
      </div>
      {loading ? (
        <div className="text-center mt-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        currentResponse && (
          <div className="response-container">
            <div className="response-text">
              {currentResponse}
            </div>
            <div className="response-actions">
              <button onClick={handleAccept} className="btn btn-success">✓</button>
              <button onClick={handleReject} className="btn btn-danger">✗</button>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default GeminiInReact;
