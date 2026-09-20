/** @type {import('next').NextConfig} */

// GitHub Pages 프로젝트 사이트는 /<저장소이름>/ 아래에서 서비스되므로
// 배포 빌드에서만 NEXT_PUBLIC_BASE_PATH(예: /aim_frontend)를 지정한다.
// 로컬 개발(npm run dev)에서는 비워 두면 기존과 동일하게 동작한다.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],

  // GitHub Pages 배포용 정적 export (out/ 폴더 생성)
  output: "export",
  basePath,
  trailingSlash: true,

  images: {
    // 정적 export에서는 Next 이미지 최적화 서버를 쓸 수 없음
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "aim-backend-cbiu.onrender.com",
      },
    ],
  },
};

export default nextConfig;
