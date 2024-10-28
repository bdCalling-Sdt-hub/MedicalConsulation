"use client"; // Marking this component as a client component

import { Button, Image, Upload } from "antd";

import { UploadOutlined } from "@ant-design/icons";

const MyUploadComponent = () => {
  return (
    <div>
      <Upload
        customRequest={customRequest}
        onChange={handleChange}
        fileList={fileList}
        beforeUpload={beforeUpload}
        multiple // Allow multiple file uploads
      >
        <Button icon={<UploadOutlined />}>Upload File</Button>
      </Upload>

      {/* Render file previews */}
      <div style={{ marginTop: 16 }}>
        {fileList.map((file) => {
          if (file.status === "done" && file.originFileObj) {
            return (
              <div key={file.uid} style={{ marginBottom: 16 }}>
                <Image
                  width={100}
                  src={URL.createObjectURL(file.originFileObj)} // Create object URL for preview
                  alt={file.name}
                />
                <div>{file.name}</div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default MyUploadComponent;
