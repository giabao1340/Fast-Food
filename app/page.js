// Trong file index.jsx hoặc trang nào đó bạn muốn sử dụng CategoryList

import BusinessList from "./(auth)/_components/BusinessList";
import CategoryList from "./(auth)/_components/CategoryList";


export default function Home() {


  return (
    <div>
        <CategoryList/>
        <BusinessList/>
        
    </div>
  );
}
