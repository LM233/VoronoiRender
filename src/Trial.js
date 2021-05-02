import { useEffect, useState } from "react";
import { Delaunay } from "d3-delaunay";
import profile from "./profile.png";

const voronoi = (img, setConfigs) => {
  //通过canvas来处理图像,生成imgData
  const canvas = document.createElement("CANVAS");
  const width = img.width;
  const height = img.height;
  canvas.height = height;
  canvas.width = width;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, width, height);
  const imgData = ctx.getImageData(0, 0, width, height);

  //生成每个像素点的灰度值，留作之后加权用
  const length = imgData.data.length;
  const size = height * width;
  const pointWeight = new Array(size);
  for (let i = 0, j = 0; i < length; i += 4, j++) {
    const gray = Math.floor(
      imgData.data[i] * 0.3 +
        imgData.data[i + 1] * 0.59 +
        imgData.data[i + 2] * 0.11
    );
    pointWeight[j] = gray;
  }

  //随机生成采样模拟点
  const points = new Array(size * 2);
  const centroid = new Array(size * 2).fill(0);
  const weight = new Array(size).fill(0);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < 30; j++) {
      const x = (points[i * 2] = Math.floor(Math.random() * width));
      const y = (points[i * 2 + 1] = Math.floor(Math.random() * height));
      if (Math.random() < pointWeight[y * width + x]) break;
    }
  }

  const delaunay = new Delaunay(points);
  const voronoi = delaunay.voronoi([0, 0, width, height]);

  for (let k = 0; k < 5; k++) {
    centroid.fill(0);
    weight.fill(0);
    //计算每个cell的加权重心
    for (let y = 0, i = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const w = pointWeight[y * width + x];
        i = delaunay.find(x + 0.5, y + 0.5, i);
        weight[i] += w;
        centroid[i * 2] += w * (x + 0.5);
        centroid[i * 2 + 1] += w * (y + 0.5);
      }
    }
    //按照加权中心对采样模拟点坐标进行移动
    const w = Math.pow(k + 1, -0.8) * 10;
    for (let i = 0; i < size; ++i) {
      const x0 = points[i * 2],
        y0 = points[i * 2 + 1];
      const x1 = weight[i] ? centroid[i * 2] / weight[i] : x0,
        y1 = weight[i] ? centroid[i * 2 + 1] / weight[i] : y0;
      points[i * 2] = x0 + (x1 - x0) * 1 + (Math.random() - 0.5) * w;
      points[i * 2 + 1] = y0 + (y1 - y0) * 1 + (Math.random() - 0.5) * w;
    }
    setConfigs({ points, width, height, n: 100 });
    console.log(points);
    voronoi.update();
  }
  setConfigs({ points, width, height, n: 5000 });
};
//子组件，用来生成模拟点图像
const RenderImage = (props) => {
  const { points, width, height, n } = props.config;
  useEffect(() => {
    const canvas = document.getElementById("image");
    canvas.height = height;
    canvas.width = width;
    const context = canvas.getContext("2d");
    context.fillStyle = "#fff";
    context.fillRect(0, 0, width, height);
    context.beginPath();
    for (let i = 0; i < n; i++) {
      const x = points[i * 2],
        y = points[i * 2 + 1];
      context.moveTo(x + 1.5, y);
      context.arc(x, y, 1.5, 0, 2 * Math.PI);
    }
    context.fillStyle = "#000";
    context.fill();
  }, [props]);
  return <canvas id="image" />;
};

const Trial = () => {
  const [configs, setConfigs] = useState({
    points: [],
    width: 0,
    height: 0,
    n: 0,
  });
  useEffect(() => {
    const img = new Image();
    img.src = profile;
    img.onload = () => voronoi(img, setConfigs);
  }, []);
  return <RenderImage config={configs} />;
};
export default Trial;
