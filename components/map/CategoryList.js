"use client"

/* eslint-disable tailwindcss/enforces-shorthand */
/* eslint-disable tailwindcss/classnames-order */
import CategoryListData from '@/constants/index';
import { useEffect, useState } from 'react';
import CategoryItem from './CategoryItem';

function CategoryList({setSelectedCategory}) {
    const [category,setCategory]=useState();
    const [selectedCategory,setSelectedCategory_]=useState();
    
    useEffect(()=>{
        setCategory(CategoryListData.CategoryListData)
    },[])
    return (
    <div>
        <h2 className='text-[20px] mt-10 
        font-bold mb-3'>Select Your Fav Category</h2>
       {category? <div className='flex gap-6 mb-5'>
            {category?.map((item,index)=>(
                <div key={index} onClick={()=>{setSelectedCategory(item.value);setSelectedCategory_(item)}}>
                    <CategoryItem category={item} selectedCategory={selectedCategory} />
                </div>
            ))}
        </div>:null}
    </div>
  )
}

export default CategoryList
