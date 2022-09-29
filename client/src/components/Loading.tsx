import { Spin } from "antd";

const Loading = () => {
  return (
    <div className="loading">
      <Spin size="large" tip="Loading..." />
    </div>
  );
};

export default Loading;
