import React from 'react';

const SinglePost = () => {
  return (
    <div className="w-full flex justify-center items-center bg-green-50 p-4">
      <div className="w-full max-w-3xl bg-opacity-70 rounded-lg shadow-md p-8">
        <h1 className="text-3xl md:text-4xl font-serif text-center text-gray-800 mb-3">
          Single Post
        </h1>
        <p className="text-center text-gray-700 max-w-xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
        </p>
      </div>
    </div>
  );
};

export default SinglePost;