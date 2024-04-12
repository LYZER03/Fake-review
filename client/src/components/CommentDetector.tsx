'use client'

import React, { useState, useEffect, useCallback } from 'react';

const CommentDetector: React.FC = () => {
  const [comment, setComment] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const fetchData = useCallback(async () => {
    if (comment) {
      const response = await fetch('http://localhost:8080/api/detect-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comment })
      });

      const data = await response.json();
      setResult(data.result);
    }
  }, [comment]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetchData();
    }
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Review Detector</h1>
          <label htmlFor="comment" className="label">
            <span className="label-text font-bold">Enter your review:</span>
          </label>
          <textarea
            placeholder="...."
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="textarea textarea-bordered textarea-lg w-full max-w-xs"
          ></textarea>
        <button
          type="button"
          onClick={fetchData}
          className="btn btn-primary mt-4"
        >
          Detect Review
        </button>

      {result && (
        <div className="alert alert-success shadow-lg mt-6">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{result}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentDetector;




