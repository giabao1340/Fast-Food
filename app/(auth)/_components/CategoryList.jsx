'use client'

import { ArrowRightCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";

function CategoryList() {
    const listRef = useRef(null);
    const [categoryList, setCategoryList] = useState([]);
    const params = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        setSelectedCategory(params.get('category'));
    }, [params]);

    useEffect(() => {
        getCategoryList();
    }, []);
      
    const getCategoryList = () => {
        GlobalApi.GetCategory().then(resp => {
            console.log(resp.categories);
            setCategoryList(resp.categories);
        });
    };

    const ScrollRightHandler = () => {
        if (listRef.current) {
            listRef.current.scrollBy({
                left: 200,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className='mt-10 relative'>   
            <div className='flex gap-4 overflow-auto scrollbar-hide' ref={listRef}>
                {categoryList && categoryList.map((category, index) => (
                    <Link key={index} href={`?category=${category.slug}`} className={`flex flex-col items-center gap-2 border p-3 rounded-xl min-w-28
                     hover:border-primary hover:bg-orange-50 cursor-pointer group
                    ${selectedCategory === category.slug ? 'text-primary border-primary shadow-md bg-orange-50' : ''}
                    `}>
                        <Image 
                            src={category.icon?.url} 
                            alt={category.name}
                            width={40}
                            height={40} 
                            className='group-hover:scale-110 transition-all duration-200'
                        />
                        <h2 className='text-sm font-medium group-hover:text-primary'>{category.name}</h2>
                    </Link>
                ))}
            </div>
            <ArrowRightCircle className='absolute -right-10 top-9 bg-gray-500 rounded-full text-white'
                onClick={() => ScrollRightHandler()}
            />
        </div>
    );
}

export default CategoryList;
