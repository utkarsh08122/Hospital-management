import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='m:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/*--------left-------*/}
            <div>
            <img className='mb-5 w-40 ' src={assets.logo} alt="" />
            <pc className='w-full md:w-2/3 text-gray-600 leading-6'>HRS Hospital is a premier healthcare institution dedicated to providing high-quality, compassionate medical care to patients. With a team of experienced doctors, skilled nurses, and advanced medical technology, HRS Hospital offers a wide range of services, including general medicine, specialized treatments, surgeries, and emergency care. </pc>
            </div>

             {/*--------center-------*/}
             <div>
                <p className='text-xl gap-2 font-medium mv-5'>COMPANY</p>
                <ul className='flex flex-col gap-4 text-gray-600'>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact us</li>
                    <li>Privicy Policy</li>
                </ul>
                </div>

                 {/*--------right-------*/}
            <div>
                <p className='text-xl font-medium mv-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-4 text-gray-600'>
                    <li>+1-212-456-7890</li>
                    <li>greatstackdev@gmail.com</li>
                </ul>
                
                </div>
        </div>
        {/*------Copyright text */}
        <div>
            <hr />
    <p className='py-5 text-sm text-center'>Copyright © 2024 GreatStack - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer