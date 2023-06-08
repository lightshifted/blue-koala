import React, { useState } from 'react';
import { Upload, message, Button, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Navbar from '../navBar/NavBar';
import DisplayMessages from '../displayMessages/DisplayMessages';


const FileUpload = ({ setUploadStatus }) => {

  const props = {
    name: 'file',
    action: 'http://127.0.0.1:8000/api/ingest', // replace with your upload URL
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        setUploadStatus(true);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <div className="bg-gradient-radial h-screen">
      <header>
        <Navbar />
      </header>
      <div className="flex items-center justify-center mt-16">
      <div className="w-4/5 bg-white pt-3 pr-3 pl-3 pb-3 rounded-md">
      <Upload.Dragger {...props} className="w-4/5">
        <p className="ant-upload-drag-icon">
          <UploadOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
        All uploaded files will be used for research purposes only.
        </p>
      </Upload.Dragger>
      </div>
    </div>
    <div className="flex items-center justify-center m-20">
    <DisplayMessages />
    </div>

    </div>
  );
};

export default FileUpload;
