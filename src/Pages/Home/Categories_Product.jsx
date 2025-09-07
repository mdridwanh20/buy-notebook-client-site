import React from 'react'
import useAddItem from '../../Hook/useAddItem'
import { HeadingH2 } from '../../Components/ShareCompo/Typography'

export default function Categories_Product() {


  const {addItem} = useAddItem()

  // const categories = [...new Set(addItem.map((item) => item.category))] 

  const seen = new Set()
  

  console.log(addItem);
  

  return (
    <div className='py-16'>
      
      <div className='flex items-center justify-center'>
        <HeadingH2 headH2={'Featured categories'}></HeadingH2>
      </div>

        {/* ✅ Display categories */}
      <div className="grid grid-cols-2 gap-5 md:grid-cols-4 mt-4">

          {
            addItem.map((item, index) => {

              if(seen.has(item.category)) return null
              seen.add(item.category)

              return (

              <div
              key={index}
              className="flex border bg-white border-gray-300  rounded-md flex-col items-center  py-7 px-4"
            >

             <div className=''>
               <img
                src={item.imageURL}
                alt={item.category}
                className="w-28 h-28  object-cover rounded-full mb-3"
              />
              <h3 className="text-lg  font-semibold text-center">{item.category}</h3>

            </div>
             </div>

              )

            })
          }


      </div>


    </div>
  )
}
