import { gql, request } from 'graphql-request';

const MASTER_URL = process.env.NEXT_PUBLIC_BACKEDN_API_URL;

const GetCategory = async () => {
  const query = gql`
    query Categories {
      categories(first: 50) {
        id
        slug
        name
        icon {
          url
        }
      }
    }
  `;
  
  const result = await request(MASTER_URL, query);
  return result;
};

const GetBusiness = async (category) => {
  const query = gql`
    query GetBusiness($category: String!) {
      restaurants(where: { categories_some: { slug: $category } }) {
        aboutUs
        address
        banner {
          url
        }
        categories {
          name
        }
        id
        name
        restroType
        slug
        workingHours
      }
    }
  `;

  const variables = { category };
  const result = await request(MASTER_URL, query, variables);
  return result;
};


const GetBusinessDetail = async (businessSlug) => {
  const query = gql`
    query RestaurantDetail($businessSlug: String!) {
      restaurant(where: { slug: $businessSlug }) {
        aboutUs
        address
        banner {
          url
        }
        categories {
          name
        }
        id
        name
        restroType
        slug
        workingHours
        menu {
          ... on Menu {
            id
            category
            menuItem {
              ... on MenuItem {
                id
                name
                description
                price
                productImage {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;

  const variables = { businessSlug };
  const result = await request(MASTER_URL, query, variables);
  return result;
}
 

const AddToCart = async (data) => {
  const query = gql`
    mutation AddToCart($email: String!, $price: Float!, $productDescription: String!, $productImage: String!, $productname: String!, $restaurantSlug: String!) {
      createUserCart(
        data: {
          email: $email, 
          price: $price, 
          productDescription: $productDescription,
          productImage: $productImage, 
          productname: $productname, 
          restaurant: {connect: {slug: $restaurantSlug}}
        }
      ) {
        id
      }
      publishManyUserCarts(to: PUBLISHED) {
        count
      }
    }
  `;

  const variables = {
    email: data.email,
    price: data.price,
    productDescription: data.description,
    productImage: data.productImage,
    productname: data.name,
    restaurantSlug: data.restaurantSlug
  };

  const result = await request(MASTER_URL, query, variables);
  return result;
};

const GetUserCart = async (userEmail) => {
  // Định nghĩa truy vấn GraphQL sử dụng thẻ gql từ thư viện GraphQL của bạn
  const query = gql`
    query GetUserCart($email: String!) {
      userCarts(where: { email: $email }) {
        id
        price
        productDescription
        productImage
        productname
        restaurant{
          name
          banner{
            url
          }
          slug
        }
      }
    }
  `;

  // Chuẩn bị đối tượng biến với tham số email
  const variables = {
    email: userEmail
  };

  try {
    // Gửi yêu cầu sử dụng hàm request, giả sử MASTER_URL đã được định nghĩa ở đâu đó
    const result = await request(MASTER_URL, query, variables);
    return result;
  } catch (error) {
    // Xử lý bất kỳ lỗi nào xảy ra trong quá trình yêu cầu
    console.error('Lỗi khi lấy thông tin giỏ hàng:', error);
    throw error; // Tùy chọn ném lại lỗi hoặc xử lý lỗi theo cách thích hợp
  }
};


export default {
  GetCategory,
  GetBusiness,
  GetBusinessDetail,
  AddToCart,
  GetUserCart
};
