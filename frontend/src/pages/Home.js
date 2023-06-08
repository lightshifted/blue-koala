import React, { useState } from 'react';
import ChatCard from '../components/chatCard/ChatCard';
import FileUpload from '../components/fileUpload/FileUploadCard';

const Home = () => {
  const [status, setUploadStatus] = useState(false);

  const filename = ""

  return (
    <div>
      {status ? (
        <ChatCard />
      ) : (
        <FileUpload setUploadStatus={setUploadStatus} filename={filename} />
      )}
    </div>
  );
};

export default Home;