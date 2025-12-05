const fs = require('fs');
const path = require('path');

// ▼ 수정할 부분: 이미지가 들어있는 폴더의 경로를 입력하세요.
const directoryPath = './burger_set'; 

// ▼ 수정할 부분: 공통으로 들어갈 카테고리명
const categoryName = 'burger';

try {
  // 1. 폴더 읽기
  const files = fs.readdirSync(directoryPath);

  // 2. 이미지 파일만 필터링 (확장자 기준)
  const imageFiles = files.filter(file => /\.(png|jpe?g|webp|gif)$/i.test(file));

  // 3. 데이터 포맷으로 변환
  const formattedData = imageFiles.map((filename, index) => {
    // 파일명에서 확장자를 제외한 이름을 'name' 필드에 임시로 넣습니다.
    const nameWithoutExt = path.parse(filename).name;

    return `{
    id: ${index + 32},
    category: '${categoryName}',
    name: '${nameWithoutExt}', 
    price: 0,
    image: require('@assets/images/mcDonalds/menu/${categoryName}/${filename}'),
  },`;
  });

  // 4. 결과 출력
  console.log(formattedData.join('\n'));

} catch (err) {
  console.error('오류 발생: 폴더 경로가 올바른지 확인해주세요.', err);
}