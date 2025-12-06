const fs = require('fs');
const path = require('path');

// 1. [설정] 파일 스캔 대상 폴더 (실제 컴퓨터 내 경로)
const localDirectory = './burger'; 

// 2. [설정] 공통 카테고리명
const categoryName = 'recommend';

// 3. [설정] 시작할 ID 번호 (여기서 조절하세요)
const startId = 12; 

// 4. [중요] require 안에 들어갈 경로 설정
// (1) 일반 image 경로
const imagePathPrefix = '@assets/images/mcDonalds/menu/burger/';
// (2) setImage 경로 (다른 폴더)
const setImagePathPrefix = '@assets/images/mcDonalds/menu/burger_set/'; 


try {
  const files = fs.readdirSync(localDirectory);
  
  // 이미지 파일 필터링
  const imageFiles = files.filter(file => /\.(png|jpe?g|webp|gif)$/i.test(file));

  const formattedData = imageFiles.map((filename, index) => {
    const nameWithoutExt = path.parse(filename).name;

    return `{
    id: ${index + startId},
    category: '${categoryName}',
    name: '${nameWithoutExt}',
    price: 0,
    image: require('${imagePathPrefix}${filename}'),
    setImage: require('${setImagePathPrefix}${filename}'),
  },`;
  });

  console.log(formattedData.join('\n'));

} catch (err) {
  console.error('오류: 폴더 경로를 확인해주세요.', err);
}