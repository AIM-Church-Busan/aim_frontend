// GitHub Pages 프로젝트 사이트(예: /aim_frontend)에서는 public/ 파일 경로에도
// basePath를 붙여야 이미지·영상이 깨지지 않는다.
// NEXT_PUBLIC_BASE_PATH가 비어 있으면(로컬 개발 등) 경로를 그대로 반환한다.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const withBasePath = (path) => `${BASE_PATH}${path}`;
