import React, { useState } from 'react';
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useEffect } from "react";
import EnquiryList from './enquryList/enquiry';


export default function Home() {

  let [enquiry, setEnquiry] = useState([]) //read state
  let [formData, setformData] = useState({  // insert state
    name: '',
    email: '',
    phone: '',
    message: '',
    _id: ''

  })
  let getAllEnquiry = () => {
    axios.get("http://localhost:8001/api/enquiry/read").then((res) => {
      return res.data
    }).then((finalData) => {
      if (finalData.status) {
        setEnquiry(finalData.enquiryList)
      }
    })
  }



  let saveEnquiry = (e) => {
    e.preventDefault();


    if (formData._id) {
      //update
      axios.put(`http://localhost:8001/api/enquiry/update/${formData._id}`, formData).then((res)=>{
        toast.success('Enquiry Update Successfully')
        getAllEnquiry();
        setformData({
          name: '',
          email: '',
          phone: '',
          message: ''

        })
      })


    } else {  //insert
      axios.post('http://localhost:8001/api/enquiry/insert', formData).then((res) => {
        console.log(res.data)
        toast.success('Enquiry Saved Successfully')
        getAllEnquiry();
        setformData({
          name: '',
          email: '',
          phone: '',
          message: ''

        })
      })
    }

    console.log(formData)

  }


  let getValue = ((e) => {
    let oldData = { ...formData }
    let inputName = e.target.name
    let inputValue = e.target.value

    oldData[inputName] = inputValue
    setformData(oldData)

  })

  useEffect(() => {
    getAllEnquiry()
  }, [])

  return (
    <div className='bg-gray-400 min-h-[750px] '>

      <p className='font-bold py-7  text-[40px] text-center color-blue'>User Enquiry</p>
      <div className='grid grid-cols-[30%_auto] gap-5 px-5 py-10'>
        <div className='bg-gray-200 rounded-2xl px-5'>
          <h1 className='font-bold text-[20px] py-2 text-center'>Enquiry Form</h1>
          <form action="" onSubmit={saveEnquiry}>
            <div className='px-5 py-5'>
              <Label htmlFor="name" />
              <TextInput id="name" type="name" onChange={getValue} value={formData.name} name="name" placeholder="Enter Your Name" required />
            </div>
            <div className='px-5 py-3'>
              <Label htmlFor="email" />
              <TextInput id="email" type="email" name="email" onChange={getValue} value={formData.email} placeholder="Enter Your E-Mail" required />
            </div>
            <div className='px-5 py-3'>
              <Label htmlFor="phone" />
              <TextInput id="phone" type="text" name="phone" onChange={getValue} value={formData.phone} placeholder="Enter Your Phone-No" required />
            </div>
            <div className='px-5 py-3'>
              <Label htmlFor="msg" />
              <TextInput id="large" type="text" name="message" onChange={getValue} value={formData.message} sizing="lg" placeholder="Enter Your Message" />
            </div>
            <div className='px-34 py-3'>
              <Button className='bg-blue-500 px-5 py-2 ' type="submit" value="submit">
                {formData._id ? 'Update' : 'Save'}
              </Button>
            </div>
          </form>
        </div>

        <EnquiryList data={enquiry} getAllEnquiry={getAllEnquiry} Swal={Swal} setformData={setformData} />


      </div>
    </div>
  );
}