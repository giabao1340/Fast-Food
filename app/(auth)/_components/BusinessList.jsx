"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import BusinessItem from "./BusinessItem";

function BusinessList() {
  const params = useSearchParams();
  const [category, setCategory] = useState('all');
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    const categoryParam = params.get('category');
    if (categoryParam) {
      setCategory(categoryParam);
      getBusinessList(categoryParam);
    }
  }, [params]);

  const getBusinessList = async (category_) => {
    try {
      const resp = await GlobalApi.GetBusiness(category_);
      setBusinessList(resp?.restaurants || []);
    } catch (error) {
      console.error("Error fetching businesses:", error);
    }
  };

  return (
    <div className="mt-5">
      <h2 className="font-bold text-2xl">Popular {category} Restaurants</h2>
      <h2 className="font-bold text-primary">{businessList.length} Result{businessList.length !== 1 ? 's' : ''}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:cols-3 lg:grid-cols-4 gap-7 mt-3">
        {businessList.length > 0 ? (
          businessList.map((restaurant, index) => (
            <BusinessItem key={index} business={restaurant} />
          ))
        ) : (
          <p>No restaurants found.</p>
        )}
      </div>
    </div>
  );
}

export default BusinessList;
