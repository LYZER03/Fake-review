'use client'

import React, { useState, useEffect, useCallback } from 'react';
import Image from "next/image";

const CommentDetector: React.FC = () => {
  const [comment, setComment] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [showPopup, setShowPopup] = useState<boolean>(false); // état pour gérer l'affichage du popup
  const [popupImage, setPopupImage] = useState<string>('/dogo.png'); // Image par défaut

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
      setShowPopup(true); // affiche le popup lorsque le résultat est reçu

      // Déterminer quelle image afficher en fonction du résultat
      if (data.result === 'The review appears to be genuine.') {
        setPopupImage('/chad.png'); // Image Genuine
      } else {
        setPopupImage('/dogo.png'); // Image par défaut
      }
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

      {showPopup && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <img src={popupImage} alt='' className="max-w-sm rounded-lg shadow-2xl" />
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Review Result
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {result === 'The review appears to be genuine.' ? (
                          <span className="text-green-600 font-bold">
                            Genuine Review!
                          </span>
                        ) : (
                          <span className="text-red-600 font-bold">
                            False Review!
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentDetector;










