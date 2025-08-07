import fs from 'fs';
import path from 'path';

// npm 패키지 내 원본 경로
const npmLottieDir = path.resolve('node_modules/platform-lottie-assets/lotties');
// GitHub 배포용 lotties 폴더 (프로젝트 루트에 위치)
const targetLottieDir = path.resolve('./lotties');
// 목록 파일 경로
const outputListPath = path.join(targetLottieDir, 'animations.json');

// lotties 폴더가 없다면 생성 (재귀적으로)
if (!fs.existsSync(targetLottieDir)) {
  fs.mkdirSync(targetLottieDir, { recursive: true });
}

// 모든 json 파일 복사 & 파일명 리스트 저장
const files = fs.readdirSync(npmLottieDir).filter(f => f.endsWith('.json'));

// 복사
for (const file of files) {
  const src = path.join(npmLottieDir, file);
  const dest = path.join(targetLottieDir, file);
  fs.copyFileSync(src, dest);
}

// animations.json 생성
fs.writeFileSync(outputListPath, JSON.stringify(files, null, 2), 'utf-8');

console.log('✅ 모든 lottie 파일 복사 및 animations.json 생성 완료');
console.log(`복사된 파일: ${files.length}개`);