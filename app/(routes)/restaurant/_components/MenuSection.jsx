import GlobalApi from "@/app/(auth)/_utils/GlobalApi";
import { CartUpdateContext } from "@/app/_context/CartUpdateContext";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { SquarePlus } from "lucide-react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

function MenuSection({ restaurant }) {
  const [menuItemList, setMenuItemList] = useState(null);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const {user}= useUser()
  const {updateCart,setUpdateCart} = useContext(CartUpdateContext)
  useEffect(() => {
    if (restaurant?.menu?.length > 0) {
      FilterMenu(selectedCategoryIndex);
    }
  }, [restaurant, selectedCategoryIndex]);

  const FilterMenu = (index) => {
    if (restaurant?.menu?.[index]) {
      setMenuItemList(restaurant.menu[index]);
    } else {
      setMenuItemList(null);
    }
  };
  const addToCartHandler=(item)=>{
    toast('Adding to Cart')
    const data={
      email:user?.primaryEmailAddress?.emailAddress,
      name :item?.name,
      description:item?.description,
      productImage:item?.productImage?.url,
      price:item?.price,
      restaurantSlug:restaurant.slug
    }
    GlobalApi.AddToCart(data).then(resp=>{
      console.log(resp);
      setUpdateCart(!updateCart)
      toast('Added to Cart')
    },(error)=>{
      toast('Error')
    })
  }

  return (
    <div>
      <div className="grid grid-cols-4 mt-2">
        <div className="hidden md:flex flex-col mr-10 gap-2">
          {restaurant?.menu?.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`flex justify-start font-bold ${
                index === selectedCategoryIndex ? 'text-primary' : ''
              }`}
              onClick={() => setSelectedCategoryIndex(index)}
            >
              {item.category}
            </Button>
          ))}
        </div>
        <div className="md:col-span-3 col-span-4">
          {menuItemList && (
            <>
              <h2 className="font-extrabold text-lg">{menuItemList.category}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {menuItemList.menuItem.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 flex gap-4 border rounded-xl hover:border-primary "
                  >
                    <Image
                      src={item?.productImage?.url}
                      alt={item.name}
                      width={120}
                      height={120}
                      className="object-cover w-[120px] h-[120px] rounded-xl"
                    />
                    <div className="flex flex-col gap-1">
                      <h2 className="font-bold">{item.name}</h2>
                      <h2>{item.price}</h2>
                      <p className="text-sm text-gray-400 line-clamp-2">{item.description}</p>
                      <SquarePlus className="cursor-pointer" size={24} onClick={()=>addToCartHandler(item)} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MenuSection;
